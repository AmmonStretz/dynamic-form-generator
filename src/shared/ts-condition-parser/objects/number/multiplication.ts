
import { NumberConditionType } from '../../math-naming.class';
import { NumberCondition } from '../../condition.class';

export class Multiplication extends NumberCondition {
  constructor(public factors: NumberCondition[]) {
    super(NumberConditionType.MULT);
  }
  calc(pointer: (key: string) => any) {
    let product = 1;
    this.factors.forEach(factor => {
      product *= factor.calc(pointer);
    });
    return product;
  }
  toJson() {
    let factors: any = [];
    this.factors.forEach(s => {
      factors.push(s.toJson());
    });
    return {
      type: NumberConditionType.MULT,
      factors: factors
    };
  }
}