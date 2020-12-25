import { ValueFieldConfig } from './../Field.dto';
import { ValueField, FieldTypes } from '../Field.dto';
import { Validator } from '../../Validators/validators.class';

export interface NumberInputConfig extends ValueFieldConfig<number> {
  unit?: string
}

export class NumberInput extends ValueField<number> {
  constructor(
    public key: string,
    public config: NumberInputConfig,
    public validators: Validator<number>[] = [],
  ) {
    super(FieldTypes.NUMBER_INPUT, config, validators);
  }

  public toJson() {

    let validators: any[] = [];
    this.validators.forEach(validator => {
      validators.push(validator.toJson())
    })

    return {
      type: this.type,
      key: this.key,
      config: this.config,
      validators: validators
    }
  }
}
