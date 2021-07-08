import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Validator } from '../../../Validators/validators.class';
import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';

export class CheckboxConfig extends ValueFieldConfig<boolean> {
  constructor(
    public key: string,
    public settings: ValueFieldSettings<boolean>,
    public validators: Validator<boolean>[] = [],
    public visible: BooleanCondition = new BooleanConst(true)
  ) {
    super(
      key,
      'checkbox',
      settings,
      validators,
      visible
    );
  }

  public createStatus() {
    this.status = new ValueFieldStatus<boolean>(
      this.key,
      !!this.settings.default
    )
    this.status.config = this;
  }
  public getAllPaths(rootPath: string): { path: string, type: string}[] {
    return [{ path: rootPath+this.key, type: 'boolean'}];
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
