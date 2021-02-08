import { FieldTypes } from '../../Field.dto';
import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '../../../math-logic/math-object.class';
import { BooleanConst } from '../../../math-logic/objects/boolean/const';
import { ValueField, ValueFieldConfig, ValueFieldStatus } from '../ValueField.dto';

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
    status?: ValueFieldStatus<number>
  ) {
    super(
      key,
      FieldTypes.NUMBER_RANGE,
      config,
      validators,
      visible,
      status ? status : new ValueFieldStatus<number>(
        key,
        config.default ? config.default : null,
      )
    );
  }

  public toJson() {
    return {
      type: this.type,
      key: this.key,
      config: this.config,
      validators: this.validators.map(val => val.toJson())
    }
  }
}
