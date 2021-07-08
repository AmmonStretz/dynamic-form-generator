
import { BooleanConditionType } from '../../../math-naming.class';
import { BooleanCondition, StringCondition } from '../../../condition.class';
import { Comparator, NumberCondition } from '../../../condition.class';

export class NotEqual extends Comparator<NumberCondition | StringCondition | BooleanCondition> {
  constructor(left: NumberCondition | StringCondition | BooleanCondition, right: NumberCondition | StringCondition | BooleanCondition){
    super(BooleanConditionType.NE, left, right)
  }
  calc(pointer: (key: string) => any): boolean {
    return this.first.calc(pointer) != this.second.calc(pointer);
  }
  toJson() {
    return {
      type: BooleanConditionType.NE,
      first: this.first.toJson(),
      second: this.second.toJson()
    };
  }
}