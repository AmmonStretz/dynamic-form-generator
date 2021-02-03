import { FieldStatus, ValueFieldConfig } from './../Field.dto';
import { Field, ValueField, FieldTypes } from '../Field.dto';
import { Validator } from '../../Validators/validators.class';
import { BooleanObject } from '../../math-logic/math-object.class';
import { BooleanConst } from '../../math-logic/objects/boolean/const';

export class FieldGroupStatus extends FieldStatus<{ [key: string]: FieldStatus<any> }>{
  constructor(
    public key: string,
    public value: { [key: string]: FieldStatus<any> },
    public isValid?: boolean,
    public showErrors?: boolean,
    public errors?: { message: string, type: string }[]) {
      super(key, value, isValid, showErrors, errors);
    }
    public showAllErrors(): void {
      for (const key in this.value) {
        if (Object.prototype.hasOwnProperty.call(this.value, key)) {
          this.value[key].showAllErrors();
        }
      }
    }
}

export interface FieldGroupConfig extends ValueFieldConfig<{ [key: string]: any }> {
  title?: string,
  horizontal?: boolean;
  description?: string;
}

export class FieldGroup extends ValueField<{ [key: string]: any }> {
  constructor(
    public key: string,
    public fields: Field[],
    public config: FieldGroupConfig,
    public validators: Validator<{ [key: string]: any }>[] = [],
    public visible: BooleanObject = new BooleanConst(true),
  ) {
    super(key, FieldTypes.FIELD_GROUP, config, validators, visible);
  }

  public generateStatus(): FieldStatus<{ [key: string]: any }> {
    let value: { [key: string]: any } = {};
    this.fields.forEach(field => {
      if (field instanceof ValueField) {
        value[field.key] = field.generateStatus();
      }
    });
    return new FieldStatus<{ [key: string]: any }>( this.key, value )
  }

  public toJson() {

    let validators: any[] = [];
    this.validators.forEach(validator => {
      validators.push(validator.toJson())
    })
    let fields: any[] = [];
    this.fields.forEach(field => {
      fields.push(field.toJson())
    })

    return {
      type: this.type,
      key: this.key,
      fields: fields,
      config: this.config,
      validators: validators
    }
  }
}
