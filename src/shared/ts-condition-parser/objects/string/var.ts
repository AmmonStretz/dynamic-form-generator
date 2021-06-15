
import { StringConditionType } from '../../math-naming.class';
import { StringCondition } from '../../condition.class';

export class StringVar extends StringCondition {
  constructor(public key: string, public defaultValue: string = '') {
    super(StringConditionType.VAR);
  }
  calc(pointer: (key: string) => any): string {
    let value = pointer(this.key);
    return (value != undefined && value != null)? value: this.defaultValue;
  }
  toJson() {
    return {
      type: StringConditionType.VAR,
      key: this.key
    };
  }
}