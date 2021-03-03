import { Validator } from '../../../Validators/validators.class';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { ValueField, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';

export interface TextAreaSettings extends ValueFieldSettings<string> {
  name: string,
  description: string,
}

export class TextArea extends ValueField<string> {
  constructor(
    public key: string,
    public settings: TextAreaSettings,
    public validators: Validator<string>[] = [],
    public visible: BooleanObject = new BooleanConst(true),
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
