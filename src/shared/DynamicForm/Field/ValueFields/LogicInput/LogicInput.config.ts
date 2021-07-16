import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Validator } from '../../../Validators/validators.class';
import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';

export class LogicInputConfig extends ValueFieldConfig<BooleanCondition> {
  constructor(
    public key: string,
    public options: { path: string, type: string }[],
    public settings: ValueFieldSettings<BooleanCondition>,
    public validators: Validator<BooleanCondition>[] = [],
    public visible: BooleanCondition = new BooleanConst(true)
  ) {
    super(
      key,
      'logic-input',
      settings,
      validators,
      visible
    );
  }

  public createStatus() {
    this.status = new ValueFieldStatus<BooleanCondition>(
      this.key,
      null
    )
    this.status.config = this;
  }
  public getAllPaths(rootPath: string): { path: string, type: string }[] {
    return [];
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
