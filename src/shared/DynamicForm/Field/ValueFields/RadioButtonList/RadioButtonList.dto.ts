import { ValueField, ValueFieldConfig, ValueFieldStatus } from '../ValueField.dto';
import { FieldTypes } from '../../Field.dto';
import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';

export interface RadioButtonListConfig extends ValueFieldConfig<number> {
  type: string,
}

export class RadioButtonList extends ValueField<number> {
  constructor(
    public key: string,
    public options: { name: string, value: number }[],
    public config: RadioButtonListConfig,
    public validators: Validator<number>[] = [],
    public visible: BooleanObject = new BooleanConst(true),
    status?: ValueFieldStatus<number>
  ) {
    super(key,
      FieldTypes.RADIO_BUTTON_LIST,
      config,
      validators,
      visible,
      status ? status : new ValueFieldStatus<number>(
        key,
        config.default!=null && config.default!=undefined ? config.default : options[0].value,
      )
    );
  }

  public toJson() {


    return {
      type: this.type,
      key: this.key,
      options: this.options,
      config: this.config,
      validators: this.validators.map(val => val.toJson())
    }
  }
}
