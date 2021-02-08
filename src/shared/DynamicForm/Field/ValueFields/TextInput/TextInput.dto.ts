import { FieldTypes } from '../../Field.dto';
import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '../../../math-logic/math-object.class';
import { BooleanConst } from '../../../math-logic/objects/boolean/const';
import { ValueField, ValueFieldConfig, ValueFieldStatus } from '../ValueField.dto';

export interface TextInputConfig extends ValueFieldConfig<string> {
  unit?: string
}

export class TextInput extends ValueField<string> {
  constructor(
    public key: string,
    public config: TextInputConfig,
    public validators: Validator<string>[] = [],
    public visible: BooleanObject = new BooleanConst(true),
    status?: ValueFieldStatus<string>,
  ) {
    super(key,
      FieldTypes.TEXT_INPUT,
      config,
      validators,
      visible,
      status ? status : new ValueFieldStatus<string>(
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
