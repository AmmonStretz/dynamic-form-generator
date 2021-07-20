import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';
import { Validator } from '../../../Validators/validators.class';
import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';

export interface SelectSettings extends ValueFieldSettings<number> {}

export class SelectConfig extends ValueFieldConfig<number> {
  constructor(
    public key: string,
    public options: { name: string, value: number }[],
    public settings: SelectSettings,
    public validators: Validator<number>[] = [],
    public visible: BooleanCondition = new BooleanConst(true)
  ) {
    super(
      key,
      'select',
      settings,
      validators,
      visible
    );
  }
  public createStatus(overwrite: boolean = false) {
    const value: number = this.settings?.default!=null && this.settings?.default!=undefined ? this.settings.default : null;
    this.status = new ValueFieldStatus<number>(
      this.key,
      value,
      value != null
    )
    this.status.config = this;
  }

  public getAllPaths(rootPath: string): { path: string, type: string}[] {
    return [{path: rootPath+this.key, type: 'number'}];
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
