

import { NumberConditionType } from '../../math-naming.class';
import { NumberCondition } from '../../condition.class';

export class Subtraction extends NumberCondition {
  constructor(public minuend: NumberCondition, public subtrahend: NumberCondition) {
    super(NumberConditionType.DIV);
  }
  calc(pointer: (key: string) => any) {
    return this.minuend.calc(pointer) - this.subtrahend.calc(pointer);
  }
  toJson() {
    return {
      type: NumberConditionType.DIV,
      minuend: this.minuend.toJson(),
      subtrahend: this.subtrahend.toJson()
    };
  }
}