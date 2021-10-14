import { FieldStatus } from '../Field.config';
import { FieldConfig } from '../Field.config';
import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueFields/ValueField.config';
import { ContentFieldConfig, ContentFieldStatus } from '../ContentFields/ContentField.config';
import { BooleanCondition, NumberCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Path } from '../../config';
import { FieldGroupStatus } from '../FieldGroup/FieldGroup.config';
import { NumberConst } from '@/shared/ts-condition-parser/objects/number.class';
import { FieldParser } from '../Field.parser';

export class FieldLoopStatus extends FieldStatus {
  declare public config: FieldLoopConfig;
  constructor(
    public key: string,
    public isValid?: boolean,
    public visible: boolean = true,
  ) {
    super(key, isValid, visible);
  }
  public update(showErrors: boolean = false): FieldLoopStatus {
    this.config.generateFields();
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
    let index = path.split(/\/(.+)/)[0];
    let current = path.split(/\/(.+)/)[1].split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1].split(/\/(.+)/)[1];

    after = after ? after : '';
    // TODO: if path ends here
    if (index == 'Root:') {
      return this.config.root.status.getValueByKey(current + '/' + after);
    } else if (index == '..') {
      return this.parent.getValueByKey(after);
    } else if (+index != NaN && typeof +index == "number" && this.children.length > +index) {
      const child = this.children[+index];
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
    return null;
  }
}

export interface FieldLoopSettings extends ValueFieldSettings<{ [key: string]: any }> {
  title?: string,
  horizontal?: boolean;
  description?: string;
}

export class FieldLoopConfig extends FieldConfig {

  declare public status: FieldLoopStatus;
  public fields: FieldConfig[] = [];
  constructor(
    public key: string,
    public field: FieldConfig,
    public settings: FieldLoopSettings,
    public visible: BooleanCondition = new BooleanConst(true),
    public condition: NumberCondition = new NumberConst(0)
  ) {
    super(
      'fieldLoop',
      key,
      settings,
      visible
    );
    console.log(this.condition);
    
    this.fields.forEach(field => {
      field.parent = this;
    });
  }
  public createStatus(overwrite: boolean = false) {
    this.status = new FieldLoopStatus(this.key);
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
  public generateFields() {
    let newNumber = this.condition.calc((key) => {
      return this.status.getValueByKey(key)
    });
    if (newNumber > this.fields.length) {
      while (newNumber > this.fields.length) {
        // DeepCopy
        let newField = FieldParser.parseFromJSON(this.field.toJson());
        newField.parent = this;
        newField.createStatus(true);
        newField.status.parent = this.status;
        this.fields.push(newField);
        this.status.children.push(newField.status)
      }
      //this.createStatus(false);
    } else {
      this.fields = this.fields.splice(0, newNumber);
      this.status.children = this.status.children.splice(0, newNumber);
    }
  }
  public getAllPaths(key: string, parentPath?: string): Path {
    // debugger;
    let complete = key;
    if (parentPath) {
      complete = parentPath + '/' + key;
    }
    let path = new Path(this.settings.title, key, null, [], complete);
    if (this.fields.length) {
      let i = 0;
      this.fields.filter(field => !(field instanceof ContentFieldConfig)).forEach((field) => {
        path.subpaths.push(field.getAllPaths(field.key, complete + '/' + i++))
      });
    }
    return path;
  }

  // public toJson() {

  public toJson() {
    let fields: any[] = [];
    this.fields.forEach(field => {
      fields.push(field.toJson())
    })
    return {
      type: this.type,
      field: this.field,
      fields,
      settings: this.settings,
      visible: this.visible.toJson(),
      condition: this.condition.toJson()
    }
  }
}
