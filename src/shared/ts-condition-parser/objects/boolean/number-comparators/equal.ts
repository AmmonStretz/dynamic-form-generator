import { BooleanConditionType } from '../../../math-naming.class';
import { StringCondition } from '../../../condition.class';
import { Comparator, NumberCondition } from '../../../condition.class';

export class Equal extends Comparator<NumberCondition | StringCondition> {
  constructor(left: NumberCondition | StringCondition, right: NumberCondition | StringCondition){
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