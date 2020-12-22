import { ValueFieldConfig } from './../Field.dto';
import {ValueField} from '../Field.dto';
import { Validator } from '../../Validators/validators.class';

export interface NumberRangeConfig extends ValueFieldConfig<number> {
  unit?: string,
  min: number,
  max: number,
  step: number,
}

export class NumberRange extends ValueField<number> {
  constructor(
    public key: string,
    public config: NumberRangeConfig,
    public validators: Validator<number>[] = [],
  ) {
    super(config, validators);
    this.type = 'NumberRange'
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
