import { ValueField, ValueFieldConfig, ValueFieldStatus } from '../ValueField.dto';
import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';

export interface NumberInputConfig extends ValueFieldConfig<number> {
  unit?: string,
  min?: number,
  max?: number
}

export class NumberInput extends ValueField<number> {
  constructor(
    public key: string,
    public config: NumberInputConfig,
    public validators: Validator<number>[] = [],
    public visible: BooleanObject = new BooleanConst(true),
    status?: ValueFieldStatus<number>,
  ) {
    super(
      key,
      'numberInput',
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
