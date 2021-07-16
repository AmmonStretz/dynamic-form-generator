
import { BooleanConditionType } from '../../../math-naming.class';
import { NumberComparator, NumberCondition } from '../../../condition.class';

export class GreaterThan extends NumberComparator {
  constructor(first: NumberCondition, second: NumberCondition){
    super(BooleanConditionType.GT, first, second)
  }
  calc(pointer: (key: string) => any): boolean {
    return this.first.calc(pointer) > this.second.calc(pointer);
  }
  toJson() {
    return {
      type: BooleanConditionType.GT,
      first: this.first.toJson(),
      second: this.second.toJson()
    };
  }
}