import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';
import { Validator } from '../../../Validators/validators.class';
import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Path } from '@/shared/DynamicForm/config';

export interface TextInputSettings extends ValueFieldSettings<string> {
  maxLength?: number
  showLength?: boolean
}

export class TextInputConfig extends ValueFieldConfig<string> {
  constructor(
    public key: string,
    public settings: TextInputSettings,
    public validators: Validator<string>[] = [],
    public visible: BooleanCondition = new BooleanConst(true),
  ) {
    super(
      key,
      'textInput',
      settings,
      validators,
      visible
    );
  }
  public createStatus(overwrite: boolean = false) {
    let value: string = this.settings?.default!=null && this.settings?.default!=undefined ? this.settings.default : null;
    this.status = new ValueFieldStatus<string>(
      this.key,
      value,
      value != null
    )
    this.status.config = this;
  }

  public getAllPaths(key: string): Path {
    return new Path( this.settings.name, key, 'string-var');
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
