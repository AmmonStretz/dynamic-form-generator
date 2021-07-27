import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';
import { Validator } from '../../../Validators/validators.class';
import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Path } from '@/shared/DynamicForm/config';

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
    public visible: BooleanCondition = new BooleanConst(true),
  ) {
    super(
      key,
      'numberInput',
      settings,
      validators,
      visible
    );
  }
  public createStatus(overwrite: boolean = false) {
    let value: number = this.settings?.default!=null && this.settings?.default!=undefined ? this.settings.default : null;
    this.status = new ValueFieldStatus<number>(
      this.key,
      value,
      value != null
    )
    this.status.config = this;
  }

  public getAllPaths(key: string): Path {
    return new Path( this.settings.name, key, 'number-var');
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
