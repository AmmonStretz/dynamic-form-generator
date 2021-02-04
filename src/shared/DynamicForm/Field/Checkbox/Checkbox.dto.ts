import { ValueField, ValueFieldConfig, FieldTypes, ValueFieldStatus } from '../Field.dto';
import { Validator } from '../../Validators/validators.class';
import { BooleanConst } from '../../math-logic/objects/boolean/const';
import { BooleanObject } from '../../math-logic/math-object.class';

export class Checkbox extends ValueField<boolean> {
  constructor(
    public key: string,
    public config: ValueFieldConfig<boolean>,
    public validators: Validator<boolean>[] = [],
    public visible: BooleanObject = new BooleanConst(true),
  ) {
    super(key, FieldTypes.CHECKBOX, config, validators, visible);
  }

  public generateStatus(): ValueFieldStatus<boolean> {
    return new ValueFieldStatus<boolean>(
      this.key,
      !!this.config.default
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
