import { Field, ValueFieldStatus, ValueField, FieldStatus } from '../Field/Field.dto';
import { FieldGroup, FieldGroupStatus } from '../Field/FieldGroup/FieldGroup.dto';
import { BooleanObject } from '../math-logic/math-object.class';
import { BooleanConst } from '../math-logic/objects/boolean/const';

export class FormStatus {
  constructor(
    public fields: { [key: string]: FieldStatus },
    public isValid?: boolean,
    public visible: boolean = true,
  ) { }

  public groupAllValues(values: {[key: string]: any}) {
    for (const key in this.fields) {
      if (Object.prototype.hasOwnProperty.call(this.fields, key)) {
        if (this.fields[key] instanceof ValueFieldStatus) {
          (this.fields[key] as ValueFieldStatus<any>).groupAllValues(values);
        }
        if (this.fields[key] instanceof FieldGroupStatus) {
          (this.fields[key] as FieldGroupStatus).groupAllValues(values);
        }
      }
    }
  }

  public showAllErrors(): void {
    for (const key in this.fields) {
      if (Object.prototype.hasOwnProperty.call(this.fields, key)) {
        if (this.fields[key] instanceof ValueFieldStatus) {
          (this.fields[key] as ValueFieldStatus<any>).showAllErrors();
        }
        if (this.fields[key] instanceof FieldGroupStatus) {
          (this.fields[key] as FieldGroupStatus).showAllErrors();
        }
      }
    }
  }
}

export class Form {
  private type: string = 'Form';
  constructor(
    public fields: Field[],
    public config: {
      title?: string,
      description?: string,
    },
    public visible: BooleanObject = new BooleanConst(true),
  ) { }

  public generateStatus(): FormStatus {
    let fields: { [key: string]: FieldStatus } = {};
    this.fields.forEach(field => {
      if (field instanceof ValueField) {
        const value = field.generateStatus()
        fields[field.key] = value;
      } else if (field instanceof FieldGroup) {
        fields[field.key] = field.generateStatus();
      }
    });
    return new FormStatus(fields)
  }


  public toJson() {
    let fields: any[] = [];
    this.fields.forEach(field => {
      fields.push(field.toJson())
    })
    return {
      type: this.type,
      config: this.config,
      fields: fields,
      visible: this.visible.toJson()
    }
  }
}