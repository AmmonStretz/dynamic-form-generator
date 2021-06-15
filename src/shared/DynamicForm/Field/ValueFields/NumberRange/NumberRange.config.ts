import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Validator } from '../../../Validators/validators.class';
import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';

export interface NumberRangeSettings  extends ValueFieldSettings<number> {
  unit?: string,
  min: number,
  max: number,
  step: number,
}

export class NumberRangeConfig extends ValueFieldConfig<number> {
  constructor(
    public key: string,
    public settings: NumberRangeSettings,
    public validators: Validator<number>[] = [],
    public visible: BooleanCondition = new BooleanConst(true)
  ) {
    super(
      key,
      'numberRange',
      settings,
      validators,
      visible
    );
  }
  public createStatus() {
    this.status = new ValueFieldStatus<number>(
      this.key,
      this.settings?.default!=null && this.settings?.default!=undefined ? this.settings.default : null
    )
    this.status.config = this;
  }

  public toJson() {
    return {
      type: this.type,
      key: this.key,
      settings: this.settings,
      validators: this.validators.map(val => val.toJson())
    }
  }
}
