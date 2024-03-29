import { Path } from '@/shared/DynamicForm/config';
import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Validator } from '../../../Validators/validators.class';
import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';

export class ValidationListConfig extends ValueFieldConfig<Validator<any>[]> {
  constructor(
    public key: string,
    public validationType: string = 'any',
    public settings: ValueFieldSettings<Validator<any>[]>,
    public validators: Validator<Validator<any>[]>[] = [],
    public visible: BooleanCondition = new BooleanConst(true)
  ) {
    super(
      key,
      'validation-list',
      settings,
      validators,
      visible
    );
  }

  public createStatus(overwrite: boolean = false) {
    this.status = new ValueFieldStatus<Validator<any>[]>(
      this.key,
      [],
      true
    )
    this.status.config = this;
  }
  public getAllPaths(key: string, parentPath?: string): Path {
    return null;
  }

  public toJson() {
    return {
      type: this.type,
      validationType: this.validationType,
      key: this.key,
      settings: this.settings,
      validators: this.validators.map(val => val.toJson())
    }
  }
}
