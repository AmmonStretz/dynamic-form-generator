
import { NumberConditionType } from '../../math-naming.class';
import { NumberCondition } from '../../condition.class';

export class Pow extends NumberCondition {
  constructor(public base: NumberCondition, public exponent: NumberCondition) {
    super(NumberConditionType.POW);
  }
  calc(pointer: (key: string) => any) {
    return Math.pow(this.base.calc(pointer), this.exponent.calc(pointer));
  }
  toJson() {
    return {
      type: NumberConditionType.POW,
      base: this.base.toJson(),
      exponent: this.exponent.toJson()
    };
  }
}