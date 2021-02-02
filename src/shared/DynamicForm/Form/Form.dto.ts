import { Field, FieldStatus, ValueField } from '../Field/Field.dto';
import { BooleanObject } from '../math-logic/math-object.class';
import { BooleanConst } from '../math-logic/objects/boolean/const';

export class FormStatus {
  constructor(
    public fields: { [key: string]: FieldStatus<any> },
    public isValid?: boolean
  ) { }

  public showAllErrors(): void {
    for (const key in this.fields) {
      if (Object.prototype.hasOwnProperty.call(this.fields, key)) {
        this.fields[key].showAllErrors();
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
    let fields: { [key: string]: FieldStatus<any> } = {};
    this.fields.forEach(field => {
      if (field instanceof ValueField) {
        const value = field.generateStatus()
        fields[field.key] = value;
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