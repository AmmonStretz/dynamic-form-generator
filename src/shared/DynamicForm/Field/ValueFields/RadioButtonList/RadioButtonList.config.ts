import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';
import { Validator } from '../../../Validators/validators.class';
import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';

export interface RadioButtonListSettings extends ValueFieldSettings<number> {
  type: string,
}

export class RadioButtonListConfig extends ValueFieldConfig<number> {
  constructor(
    public key: string,
    public options: { name: string, value: number }[],
    public settings: RadioButtonListSettings,
    public validators: Validator<number>[] = [],
    public visible: BooleanCondition = new BooleanConst(true),
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
