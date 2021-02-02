import { FieldStatus, ValueFieldConfig } from './../Field.dto';
import { ValueField, FieldTypes } from '../Field.dto';
import { Validator } from '../../Validators/validators.class';
import { BooleanObject } from '../../math-logic/math-object.class';
import { BooleanConst } from '../../math-logic/objects/boolean/const';

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
    public visible: BooleanObject = new BooleanConst(true),
  ) {
    super(key, FieldTypes.NUMBER_RANGE, config, validators, visible);
  }

  public generateStatus(): FieldStatus<number> {
    return new FieldStatus<number> (
      this.key,
      this.config.default? this.config.default: null,
    )
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
