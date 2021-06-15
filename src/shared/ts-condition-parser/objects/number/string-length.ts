

import { NumberConditionType } from '../../math-naming.class';
import { NumberCondition, StringCondition } from '../../condition.class';

export class StringLength extends NumberCondition {
  constructor(public str: StringCondition) {
    super(NumberConditionType.STRING_LENGTH);
  }
  calc(pointer: (key: string) => any): number {
    return this.str.calc(pointer).length;
  }
  toJson() {
    return {
      type: NumberConditionType.STRING_LENGTH,
      str: this.str
    };
  }
}