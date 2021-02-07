import { ValueField, ValueFieldConfig, ValueFieldStatus } from '../ValueField.dto';
import { FieldTypes } from '../../Field.dto';
import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '../../../math-logic/math-object.class';
import { BooleanConst } from '../../../math-logic/objects/boolean/const';

export interface SelectConfig extends ValueFieldConfig<number> {
}

export class Select extends ValueField<number> {
  constructor(
    public key: string,
    public options: {name: string, value: number}[],
    public config: SelectConfig,
    public validators: Validator<number>[] = [],
    public visible: BooleanObject = new BooleanConst(true),
    status?: ValueFieldStatus<number>
  ) {
    super(key, FieldTypes.SELECT, config, validators, visible, status? status: new ValueFieldStatus<number>(
      key,
      config.default? config.default: null,
    ));
  }
  
  public generateStatus(): ValueFieldStatus<number> {
    return new ValueFieldStatus<number>(
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
      options: this.options,
      config: this.config,
      validators: validators
    }
  }
}