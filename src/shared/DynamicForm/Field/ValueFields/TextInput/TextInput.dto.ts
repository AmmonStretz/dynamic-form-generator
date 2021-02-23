import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { ValueField, ValueFieldConfig, ValueFieldStatus } from '../ValueField.dto';

export interface TextInputConfig extends ValueFieldConfig<string> {
  name: string,
  description: string,
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
      'textInput',
      config,
      validators,
      visible,
      status ? status : new ValueFieldStatus<string> (
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
