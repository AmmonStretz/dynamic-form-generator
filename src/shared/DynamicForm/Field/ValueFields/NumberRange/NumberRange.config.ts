import { Path } from '@/shared/DynamicForm/config';
import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Validator } from '../../../Validators/validators.class';
import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';

export interface NumberRangeSettings extends ValueFieldSettings<number> {
  unit?: string,
  min: number,
  max: number,
  step: number,
}

export class NumberRangeConfig extends ValueFieldConfig<number> {
  constructor(
    public key: string,
    public settings: NumberRangeSettings,
    public validators: Validator<number>[] = [],
    public visible: BooleanCondition = new BooleanConst(true)
  ) {
    super(
      key,
      'numberRange',
      settings,
      validators,
      visible
    );
  }
  public createStatus(overwrite: boolean = false) {
    let startValue: number = this.settings.min;
    if (
      this.settings.default != null &&
      this.settings.default != undefined &&
      this.settings.default > this.settings.min
      && this.settings.default < this.settings.max
    ) {
      startValue = this.settings.default;
    }
    this.status = new ValueFieldStatus<number>(
      this.key,
      startValue,
      true
    )
    this.status.config = this;
  }

  public getAllPaths(key: string, parentPath?: string): Path {
    let complete = key;
    if (parentPath) {
      complete = parentPath + '/' + key;
    }
    return new Path( this.settings.name, key, 'number-var', [], complete);
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
