import { BooleanConditionType } from '../../math-naming.class';
import { BooleanCondition } from '../../condition.class';

export class BooleanVar extends BooleanCondition {
  constructor(public key: string, public defaultValue: boolean = false) {
    super(BooleanConditionType.VAR);
  }
  calc(pointer: (key: string) => any): boolean {
    const value = pointer(this.key)
    return !!value ? value : this.defaultValue;
  }
  toJson() {
    return {
      type: this.type,
      key: this.key
    };
  }
}