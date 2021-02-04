import { ValueFieldStatus, ValueFieldConfig, FieldStatus } from './../Field.dto';
import { Field, ValueField, FieldTypes } from '../Field.dto';
import { BooleanObject } from '../../math-logic/math-object.class';
import { BooleanConst } from '../../math-logic/objects/boolean/const';

export class FieldGroupStatus extends FieldStatus {
  constructor(
    public key: string,
    public fields: { [key: string]: FieldStatus },
    public isValid?: boolean,
  ) {
    super(key, isValid, true); //TODO: VISIBLE
  }
  public groupAllValues(values: {[key: string]: any}) {
    for (const key in this.fields) {
      if (Object.prototype.hasOwnProperty.call(this.fields, key)) {
        if (this.fields[key] instanceof ValueFieldStatus) {
          (this.fields[key] as ValueFieldStatus<any>).groupAllValues(values);
        } else if (this.fields[key] instanceof FieldGroupStatus) {
          (this.fields[key] as ValueFieldStatus<any>).groupAllValues(values);
        }
      }
    }
  }

  public showAllErrors(): void {
    for (const key in this.fields) {
      if (Object.prototype.hasOwnProperty.call(this.fields, key)) {
        if (this.fields[key] instanceof ValueFieldStatus) {
          (this.fields[key] as ValueFieldStatus<any>).showAllErrors();
        } else if (this.fields[key] instanceof FieldGroupStatus) {
          (this.fields[key] as ValueFieldStatus<any>).showAllErrors();
        }
      }
    }
  }
}

export interface FieldGroupConfig extends ValueFieldConfig<{ [key: string]: any }> {
  title?: string,
  horizontal?: boolean;
  description?: string;
}

export class FieldGroup extends Field {
  constructor(
    public key: string,
    public fields: Field[],
    public config: FieldGroupConfig,
    public visible: BooleanObject = new BooleanConst(true),
  ) {
    super(FieldTypes.FIELD_GROUP, config, visible);
  }

  public generateStatus(): FieldStatus {
    let fields: { [key: string]: FieldStatus } = {};
    this.fields.forEach(field => {
      if (field instanceof ValueField) {
        fields[field.key] = field.generateStatus();
      } else if (field instanceof FieldGroup) {
        fields[field.key] = field.generateStatus();
      }
    });
    return new FieldGroupStatus(this.key, fields);
  }

  public toJson() {
    let fields: any[] = [];
    this.fields.forEach(field => {
      fields.push(field.toJson())
    })

    return {
      type: this.type,
      fields: fields,
      config: this.config,
      visible: this.visible,
    }
  }
}
