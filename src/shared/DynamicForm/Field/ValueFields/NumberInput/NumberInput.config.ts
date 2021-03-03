import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';
import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';

export interface NumberInputSettings extends ValueFieldSettings<number> {
  unit?: string,
  min?: number,
  max?: number
}

export class NumberInputConfig extends ValueFieldConfig<number> {
  constructor(
    public key: string,
    public settings: NumberInputSettings,
    public validators: Validator<number>[] = [],
    public visible: BooleanObject = new BooleanConst(true),
  ) {
    super(
      key,
      'numberInput',
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
