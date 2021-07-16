
import { BooleanConditionType } from '../../../math-naming.class';
import { NumberComparator, NumberCondition } from '../../../condition.class';

export class LessThan extends NumberComparator {
  constructor(first: NumberCondition, second: NumberCondition){
    super(BooleanConditionType.LT, first, second)
  }
  calc(pointer: (key: string) => any): boolean {
    return this.first.calc(pointer) < this.second.calc(pointer);
  }
  toJson() {
    return {
      type: BooleanConditionType.LT,
      first: this.first.toJson(),
      second: this.second.toJson()
    };
  }
}