import { ValueField, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';
import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';

export interface RadioButtonListSettings extends ValueFieldSettings<number> {
  type: string,
}

export class RadioButtonList extends ValueField<number> {
  constructor(
    public key: string,
    public options: { name: string, value: number }[],
    public settings: RadioButtonListSettings,
    public validators: Validator<number>[] = [],
    public visible: BooleanObject = new BooleanConst(true),
  ) {
    super(key,
      'radioButtonList',
      settings,
      validators,
      visible
    );
  }
  public createStatus() {
    this.status = new ValueFieldStatus<number>(
      this.key,
      this.settings?.default!=null && this.settings?.default!=undefined ? this.settings.default : this.options[0].value,
    )
    this.status.config = this;
  }

  public toJson() {


    return {
      type: this.type,
      key: this.key,
      options: this.options,
      settings: this.settings,
      validators: this.validators.map(val => val.toJson())
    }
  }
}
