import { BooleanConditionType } from '../../../math-naming.class';
import { BooleanCondition, StringCondition } from '../../../condition.class';
import { Comparator, NumberCondition } from '../../../condition.class';

export class Equal extends Comparator<NumberCondition | StringCondition | BooleanCondition> {
  constructor(left: NumberCondition | StringCondition | BooleanCondition, right: NumberCondition | StringCondition | BooleanCondition){
    super(BooleanConditionType.EQ, left, right)
  }
  calc(pointer: (key: string) => any): boolean {
    return this.first.calc(pointer) == this.second.calc(pointer);
  }
  toJson() {
    return {
      type: this.type,
      first: this.first.toJson(),
      second: this.second.toJson()
    };
  }
}