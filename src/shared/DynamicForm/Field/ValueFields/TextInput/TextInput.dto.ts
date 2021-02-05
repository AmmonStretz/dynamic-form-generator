import { ValueFieldStatus, ValueFieldConfig } from '../../Field.dto';
import { ValueField, FieldTypes } from '../../Field.dto';
import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '../../../math-logic/math-object.class';
import { BooleanConst } from '../../../math-logic/objects/boolean/const';

export interface TextInputConfig extends ValueFieldConfig<string> {
  unit?: string
}

export class TextInput extends ValueField<string> {
  constructor(
    public key: string,
    public config: TextInputConfig,
    public validators: Validator<string>[] = [],
    public visible: BooleanObject = new BooleanConst(true),
  ) {
    super(key, FieldTypes.TEXT_INPUT, config, validators, visible);
  }

  public generateStatus(): ValueFieldStatus<string> {
    return new ValueFieldStatus<string>(
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
