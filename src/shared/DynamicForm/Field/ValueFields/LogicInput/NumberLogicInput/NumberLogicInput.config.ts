import { Path } from '@/shared/DynamicForm/config';
import { Validator } from '@/shared/DynamicForm/Validators';
import { BooleanCondition, NumberCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../../ValueField.config';

export class NumberLogicInputConfig extends ValueFieldConfig<NumberCondition> {
  constructor(
    public key: string,
    public options: Path,
    public settings: ValueFieldSettings<NumberCondition>,
    public validators: Validator<NumberCondition>[] = [],
    public visible: BooleanCondition = new BooleanConst(true)
  ) {
    super(
      key,
      'number-logic-input',
      settings,
      validators,
      visible
    );
  }

  public createStatus(overwrite: boolean = false) {
    let value: NumberCondition = this.settings?.default!=null && this.settings?.default!=undefined ? this.settings.default : null;
    this.status = new ValueFieldStatus<NumberCondition>(
      this.key,
      value,
      value != null
    )
    this.status.config = this;
  }
  public getAllPaths(rootPath: string, parentPath?: string): Path {
    return null;
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
