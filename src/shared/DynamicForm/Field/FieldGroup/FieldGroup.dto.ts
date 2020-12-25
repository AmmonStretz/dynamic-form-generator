import { ValueFieldConfig } from './../Field.dto';
import { ValueField, FieldTypes } from '../Field.dto';
import { Validator } from '../../Validators/validators.class';
import { Field } from "../Field.dto";

export interface FieldGroupConfig extends ValueFieldConfig<{ [key: string]: any }> {
  title?: string,
  horizontal?: boolean;
}

export class FieldGroup extends ValueField<{ [key: string]: any }> {
  constructor(
    public key: string,
    public fields: Field[],
    public config: FieldGroupConfig,
    public validators: Validator<{ [key: string]: any }>[] = [],
  ) {
    super(FieldTypes.FIELD_GROUP, config, validators);
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
