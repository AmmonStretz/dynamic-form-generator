import { BooleanConditionType } from '../../math-naming.class';
import { BooleanCondition } from '../../condition.class';

export class Not extends BooleanCondition {
  constructor(public operator: BooleanCondition) {
    super(BooleanConditionType.NOT);
  }
  calc(pointer: (key: string) => any) {
    return !this.operator.calc(pointer);
  }
  toJson() {
    return {
      type: this.type,
      operator: this.operator
    };
  }
}