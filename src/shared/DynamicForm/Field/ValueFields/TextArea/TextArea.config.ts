import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Validator } from '../../../Validators/validators.class';
import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';

export interface TextAreaSettings extends ValueFieldSettings<string> {
  name: string,
  description?: string,
}

export class TextAreaConfig extends ValueFieldConfig<string> {
  constructor(
    public key: string,
    public settings: TextAreaSettings,
    public validators: Validator<string>[] = [],
    public visible: BooleanCondition = new BooleanConst(true),
  ) {
    super(key,
      'textArea',
      settings,
      validators,
      visible,
    );
  }
  public createStatus() {
    this.status = new ValueFieldStatus<string>(
      this.key,
      this.settings?.default!=null && this.settings?.default!=undefined ? this.settings.default : null,
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
