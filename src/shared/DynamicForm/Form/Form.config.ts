import { FieldConfig, FieldStatus } from '../Field/Field.config';
import { FieldGroupStatus } from '../Field/FieldGroup/FieldGroup.config';
// import { FieldLoopConfig, FieldLoopStatus } from '../Field/FieldLoop/FieldLoop.config';
import { ValueFieldStatus } from '../Field/ValueFields/ValueField.config';
import { ContentFieldStatus } from '../Field/ContentFields/ContentField.config';
import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Status } from '../status';
import { Config } from '../config';
import { ChapterConfig, ChapterStatus } from '../Chapter/Chapter.config';

export class FormStatus extends Status {

  public parent: ChapterStatus;
  public children: FieldStatus[] = [];
  public config: FormConfig;
  constructor(
    public isValid?: boolean,
    public isVisible: boolean = true,
  ) {
    super();
  }
  public update(): FormStatus {
    let valide = true;
    this.children.forEach(child => {
      let childStatus: any;
      if (child instanceof ValueFieldStatus) {
        childStatus = (child as ValueFieldStatus<any>).update();
      }
      if (child instanceof FieldGroupStatus) {
        childStatus = (child as FieldGroupStatus).update();
      }
      // if (child instanceof FieldLoopStatus) {
      //   childStatus = (child as FieldLoopStatus).update();
      // }
      if (child instanceof ContentFieldStatus) {
        (child as ContentFieldStatus).update();
        return;
      }
      if (!childStatus.isValid && childStatus.isVisible) {
        valide = false;
      }
    });
    this.isValid = valide;
    this.isVisible = this.config.visible.calc(
      (key: string) => this.getValueByKey(key)
    );
    return this;
  }
  
  public showAllErrors(): void {
    this.children.forEach(child => {
      if (child instanceof ValueFieldStatus) {
        (child as ValueFieldStatus<any>).showAllErrors();
      } else if (child instanceof FieldGroupStatus) {
        (child as FieldGroupStatus).showAllErrors();
      }
      // else if (child instanceof FieldLoopStatus) {
      //   (child as FieldLoopStatus).showAllErrors();
      // }
    });
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
            return (child as FieldGroupStatus).getValueByKey(after);
          } 
          // else if (child instanceof FieldLoopStatus) {
          //   return (child as FieldLoopStatus).getValueByKey(after);
          // } 
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
  public parent: ChapterConfig;
  public status: FormStatus;

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
  createStatus() {
    this.status = new FormStatus();
    this.status.config = this;
    this.fields.forEach(field => {
      field.createStatus();
      field.status.parent = this.status;
      this.status.children.push(field.status);
    });
  }

  get root(): any {
    return this.parent;
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