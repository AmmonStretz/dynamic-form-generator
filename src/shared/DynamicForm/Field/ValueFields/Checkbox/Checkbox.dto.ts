import { FieldTypes } from '../../Field.dto';
import { Validator } from '../../../Validators/validators.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { ValueField, ValueFieldConfig, ValueFieldStatus } from '../ValueField.dto';

export class Checkbox extends ValueField<boolean> {
  constructor(
    public key: string,
    public config: ValueFieldConfig<boolean>,
    public validators: Validator<boolean>[] = [],
    public visible: BooleanObject = new BooleanConst(true),
    status?: ValueFieldStatus<boolean>,
  ) {
    super(
      key,
      FieldTypes.CHECKBOX,
      config,
      validators,
      visible,
      status ? status : new ValueFieldStatus<boolean>(
        key,
        !!config.default
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
