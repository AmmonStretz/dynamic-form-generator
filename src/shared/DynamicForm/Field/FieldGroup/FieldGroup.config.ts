import { FieldStatus } from '../Field.config';
import { FieldConfig } from '../Field.config';
import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueFields/ValueField.config';
import { ContentFieldConfig, ContentFieldStatus } from '../ContentFields/ContentField.config';
import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Path } from '../../config';
import { FieldLoopConfig, FieldLoopStatus } from '../FieldLoop/FieldLoop.config';

export class FieldGroupStatus extends FieldStatus {
  declare public config: FieldGroupConfig;
  constructor(
    public key: string,
    public isValid?: boolean,
    public visible: boolean = true,
  ) {
    super(key, isValid, visible);
  }
  public update(showErrors: boolean = false): FieldGroupStatus {
    let valide = true;
    this.children.forEach(child => {
      let childStatus: FieldStatus;

      if (child instanceof ValueFieldStatus) {
        childStatus = (child as ValueFieldStatus<any>).update(showErrors);
        if (!childStatus.isValid && !!childStatus.visible) {
          valide = false;
        }
      } else if (child instanceof FieldGroupStatus) {
        childStatus = (child as FieldGroupStatus).update(showErrors);
        if (!childStatus.isValid && !!childStatus.visible) {
          valide = false;
        }
      }
      else if (child instanceof FieldLoopStatus) {
        childStatus = (child as FieldLoopStatus).update(showErrors);
      }
    });
    this.isValid = valide;
    this.visible = this.config.visible.calc((key) =>
      this.config.status.getValueByKey(key)
    );
    return this;
  }

  getValueByKey(path: string): any {
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    after = after ? after : '';
    // TODO: if path ends here
    if (current == 'Root:') {
      return this.config.root.status.getValueByKey(after);
    } else if (current == '..') {
      return this.parent.getValueByKey(after);
    } else {

      for (const key in this.children) {
        if (Object.prototype.hasOwnProperty.call(this.children, key)) {
          const child = this.children[key];
          if (child instanceof FieldStatus && current == child.key) {
            if (child instanceof ContentFieldStatus) {
              return (child as ContentFieldStatus).getValueByKey(after);
            } else if (child instanceof ValueFieldStatus) {
              return (child as ValueFieldStatus<any>).getValueByKey(after);
            } else if (child instanceof FieldGroupStatus) {
              return (child as FieldGroupStatus).getValueByKey(after);
            }
            else if (child instanceof FieldLoopStatus) {
              return (child as FieldLoopStatus).getValueByKey(after);
            }
          }
        }
      }
    }
    return null;
  }
}

export interface FieldGroupSettings extends ValueFieldSettings<{ [key: string]: any }> {
  title?: string,
  horizontal?: boolean;
  description?: string;
}

export class FieldGroupConfig extends FieldConfig {

  declare public status: FieldGroupStatus;
  constructor(
    public key: string,
    public fields: FieldConfig[],
    public settings: FieldGroupSettings,
    public visible: BooleanCondition = new BooleanConst(true)
  ) {
    super(
      'fieldGroup',
      key,
      settings,
      visible
    );
    this.fields.forEach(field => {
      field.parent = this;
    });
  }
  public createStatus(overwrite: boolean = false) {
    this.status = new FieldGroupStatus(this.key);
    this.status.config = this;
    let isValid = true;
    this.fields.forEach(field => {
      if (!field.status) {
        field.createStatus(overwrite);
      }
      if (!field.status.isValid && field.status.visible) {
        isValid = false;
      }
      field.status.parent = this.status;
      this.status.children.push(field.status);
    });
    this.status.isValid = isValid;
  }
  public getAllPaths(key: string, parentPath?: string): Path {
    let complete = key;
    if (parentPath) {
      complete = parentPath + '/' + key;
    }
    let path = new Path(this.settings.title, key, null, [], complete);
    if (this.fields.length) {
      this.fields.filter(field => !(field instanceof ContentFieldConfig)).forEach((field) => {
        path.subpaths.push(field.getAllPaths(field.key, complete))
      });
    }
    return path;
  }

  public toJson() {
    let fields: any[] = [];
    this.fields.forEach(field => {
      fields.push(field.toJson())
    })

    return {
      type: this.type,
      key: this.key,
      fields: fields,
      settings: this.settings,
      visible: this.visible,
    }
  }
}
