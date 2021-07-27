import { Path } from '@/shared/DynamicForm/config';
import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Validator } from '../../../Validators/validators.class';
import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';

export class LogicInputConfig extends ValueFieldConfig<BooleanCondition> {
  constructor(
    public key: string,
    public options: Path,
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

  public createStatus(overwrite: boolean = false) {
    let value: BooleanCondition = this.settings?.default!=null && this.settings?.default!=undefined ? this.settings.default : null;
    this.status = new ValueFieldStatus<BooleanCondition>(
      this.key,
      value,
      value != null
    )
    this.status.config = this;
  }
  public getAllPaths(rootPath: string): Path {
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
