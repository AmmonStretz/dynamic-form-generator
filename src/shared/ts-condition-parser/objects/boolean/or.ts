import { BooleanConditionType } from '../../math-naming.class';
import { BooleanCondition } from '../../condition.class';

export class Or extends BooleanCondition {
  public operators: BooleanCondition[];
  constructor(operators: BooleanCondition[]) {
    super(BooleanConditionType.OR);
    this.operators = operators;
  }
  calc(pointer: (key: string) => any) {
    let result = false;
    this.operators.forEach(operator => {
      result = result || operator.calc(pointer);
    });
    return result;
  }
  toJson() {
    let operators: any = [];
    this.operators.forEach(s => {
      operators.push(s.toJson());
    });
    return {
      type: this.type,
      operators: operators
    };
  }
}