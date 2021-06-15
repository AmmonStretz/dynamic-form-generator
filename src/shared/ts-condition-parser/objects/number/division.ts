

import { NumberConditionType } from '../../math-naming.class';
import { NumberCondition } from '../../condition.class';

export class Division extends NumberCondition {
  constructor(public divident: NumberCondition, public divisor: NumberCondition) {
    super(NumberConditionType.DIV);
  }
  calc(pointer: (key: string) => any) {
    let divisor = this.divisor.calc(pointer);
    if (divisor == 0) throw new Error("division by zero");
    return this.divident.calc(pointer) / divisor;
  }
  toJson() {
    return {
      type: NumberConditionType.DIV,
      divident: this.divident.toJson(),
      divisor: this.divisor.toJson()
    };
  }
}