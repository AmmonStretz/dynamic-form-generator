
import { NumberConditionType } from '../../math-naming.class';
import { NumberCondition } from '../../condition.class';

export class Addition extends NumberCondition {
  constructor(public summands: NumberCondition[]) {
    super(NumberConditionType.ADD);
  }
  calc(pointer: (key: string) => any) {
    let summ = 0;
    this.summands.forEach(summand => {
      summ += summand.calc(pointer);
    });
    return summ;
  }
  toJson() {
    let summands: any = [];
    this.summands.forEach(s => {
      summands.push(s.toJson());
    });
    return {
      type: NumberConditionType.ADD,
      summands: summands
    };
  }
}