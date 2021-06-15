
import { NumberConditionType } from '../../math-naming.class';
import { NumberCondition } from '../../condition.class';

export class NumberVar extends NumberCondition {
  constructor(public key: string, public defaultValue: number = 0) {
    super(NumberConditionType.VAR);
  }
  calc(pointer: (key: string) => any): number {
    const value = pointer(this.key);
    return (value == 0 || !!value)? value: this.defaultValue;
  }
  toJson() {
    return {
      type: NumberConditionType.VAR,
      key: this.key
    };
  }
}