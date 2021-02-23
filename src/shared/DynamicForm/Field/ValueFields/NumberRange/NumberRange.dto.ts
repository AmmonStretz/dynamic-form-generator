import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
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
      'numberRange',
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
