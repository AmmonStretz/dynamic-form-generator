
import { StringConditionType } from '../../math-naming.class';
import { StringCondition } from '../../condition.class';

export class StringConst extends StringCondition {
  constructor(public value: string) {
    super(StringConditionType.CONST);
  }
  calc(pointer: (key: string) => any): string {
    return this.value == undefined || this.value == null? '': this.value;
  }
  toJson() {
    return {
      type: StringConditionType.CONST,
      value: this.value
    };
  }
}
