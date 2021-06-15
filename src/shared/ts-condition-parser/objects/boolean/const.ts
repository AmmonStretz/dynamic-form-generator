import { BooleanConditionType } from '../../math-naming.class';
import { BooleanCondition } from '../../condition.class';

export class BooleanConst extends BooleanCondition {
  constructor(public value: boolean) {
    super(BooleanConditionType.CONST);
  }
  calc(pointer: (key: string) => any): boolean {
    return this.value;
  }
  toJson() {
    return {
      type: this.type,
      value: this.value
    };
  }
}