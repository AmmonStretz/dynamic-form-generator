import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { ValueField, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';

export interface NumberRangeSettings  extends ValueFieldSettings<number> {
  unit?: string,
  min: number,
  max: number,
  step: number,
}

export class NumberRange extends ValueField<number> {
  constructor(
    public key: string,
    public settings: NumberRangeSettings,
    public validators: Validator<number>[] = [],
    public visible: BooleanObject = new BooleanConst(true)
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
