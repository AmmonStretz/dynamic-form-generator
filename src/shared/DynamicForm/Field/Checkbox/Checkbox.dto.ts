import {ValueField, ValueFieldConfig} from '../Field.dto';
import { Validator } from '../../Validators/validators.class';

export class Checkbox extends ValueField<boolean> {
  constructor(
    public key: string,
    public config: ValueFieldConfig<boolean>,
    public validators: Validator<boolean>[] = [],
  ) {
    super(config, validators);
    this.type = 'Checkbox'
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
