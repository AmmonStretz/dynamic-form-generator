
import { BooleanConditionType } from '../../../math-naming.class';
import { BooleanCondition, StringCondition } from '../../../condition.class';
import { Comparator, NumberCondition } from '../../../condition.class';

export class NotEqual extends Comparator<NumberCondition | StringCondition | BooleanCondition> {
  constructor(first: NumberCondition | StringCondition | BooleanCondition, second: NumberCondition | StringCondition | BooleanCondition){
    super(BooleanConditionType.NE, first, second)
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