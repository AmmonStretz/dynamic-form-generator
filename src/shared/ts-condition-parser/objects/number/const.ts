
import { NumberConditionType } from '../../math-naming.class';
import { NumberCondition } from '../../condition.class';

export class NumberConst extends NumberCondition {
  constructor(public value: number) {
    super(NumberConditionType.CONST);
  }
  calc(pointer: (key: string) => any): number {
    return this.value;
  }
  toJson() {
    return {
      type: NumberConditionType.CONST,
      value: this.value
    };
  }
}