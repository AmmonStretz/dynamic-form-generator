import { ValueField, ValueFieldConfig, ValueFieldStatus } from '../ValueField.dto';
import { FieldTypes } from '../../Field.dto';
import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '../../../math-logic/math-object.class';
import { BooleanConst } from '../../../math-logic/objects/boolean/const';

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
    super(key, FieldTypes.NUMBER_INPUT, config, validators, visible, status ? status : new ValueFieldStatus<number>(
      key,
      config.default ? config.default : null,
    ));
  }

  public generateStatus(): ValueFieldStatus<number> {
    return new ValueFieldStatus<number>(
      this.key,
      this.config.default ? this.config.default : null,
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
