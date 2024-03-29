import { FieldConfig, FieldStatus } from '../Field/Field.config';
import { FieldGroupStatus } from '../Field/FieldGroup/FieldGroup.config';
// import { FieldLoopConfig, FieldLoopStatus } from '../Field/FieldLoop/FieldLoop.config';
import { ValueFieldStatus } from '../Field/ValueFields/ValueField.config';
import { ContentFieldConfig, ContentFieldStatus } from '../Field/ContentFields/ContentField.config';
import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Status } from '../status';
import { Config, Path } from '../config';
import { ChapterConfig, ChapterStatus } from '../Chapter/Chapter.config';
import { FieldLoopStatus } from '../Field/FieldLoop/FieldLoop.config';

export class FormStatus extends Status {

  declare public parent: ChapterStatus;
  public children: FieldStatus[] = [];
  declare public config: FormConfig;
  constructor(
    public isValid?: boolean,
    public visible: boolean = true,
  ) {
    super();
  }
  public update(showErrors: boolean = false): FormStatus {
    let valide = true;
  
    this.children.forEach(child => {
      let childStatus: any;
      if (child instanceof ValueFieldStatus) {
        childStatus = child.update(showErrors);
      }
      if (child instanceof FieldGroupStatus) {
      
        childStatus = child.update(showErrors);
      }
      if (child instanceof FieldLoopStatus) {
        childStatus = (child as FieldLoopStatus).update(showErrors);
      }
      if (child instanceof ContentFieldStatus) {
        child.update(showErrors);
        return;
      }
      if (!childStatus.isValid && childStatus.visible) {
        valide = false;
      }
    });
    this.isValid = valide;
    this.visible = this.config.visible.calc(
      (key: string) => this.getValueByKey(key)
    );
    return this;
  }
  
  getValueByKey(path: string): any {
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    after = after ? after : '';
    if (current == 'Root:') {
      return this.config.root.status.getValueByKey(after);
    } else if (current == '..') {
      return this.parent.getValueByKey(after);
    } else {
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        // TODO: if path ends here
        if (current == child.key) {
          if (child instanceof FieldGroupStatus) {
            return child.getValueByKey(after);
          } 
          else if (child instanceof FieldLoopStatus) {
            return (child as FieldLoopStatus).getValueByKey(after);
          } 
          else if (child instanceof ContentFieldStatus) {
            return (child as ContentFieldStatus).getValueByKey(after);
          } else if (child instanceof ValueFieldStatus) {
            return (child as ValueFieldStatus<any>).getValueByKey(after);
          }
        }
      }
    }
    return null;
  }
}

export class FormConfig extends Config {
  private type: string = 'Form';
  declare public parent: ChapterConfig;
  declare public status: FormStatus;

  constructor(
    public fields: FieldConfig[],
    public settings: {
      title?: string,
      description?: string,
    },
    public visible: BooleanCondition = new BooleanConst(true)
  ) {
    super();
    this.type = 'Form'
    this.fields.forEach(field => {
      field.parent = this;
    });
  }
  createStatus(overwrite: boolean = false) {
    this.status = new FormStatus();
    this.status.config = this;
    this.fields.forEach(field => {
      if(!field.status || overwrite){
        field.createStatus(overwrite);
      }
      field.status.parent = this.status;
      this.status.children.push(field.status);
    });
  }

  public getAllPaths(key: string, parentPath?: string): Path {
    let complete = key;
    if (parentPath) {
      complete = parentPath + '/' + key;
    }
    let path: Path = new Path( this.settings.title, key, null, [], complete);
    this.fields.filter(field => !(field instanceof ContentFieldConfig)).forEach(field => {
      path.subpaths.push(field.getAllPaths(field.key, complete))
    });
    return path;
  }

  get root(): any {
    if (this.parent) {
      return this.parent.root;
    }
    return this;
  }

  public toJson() {
    return {
      type: this.type,
      settings: this.settings,
      fields: this.fields.map(field => field.toJson()),
      visible: this.visible.toJson()
    }
  }
}