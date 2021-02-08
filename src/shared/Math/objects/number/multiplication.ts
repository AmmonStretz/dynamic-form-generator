import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import { NumberObjectType } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class Multiplication extends NumberObject {
  constructor(public factors: NumberObject[]) {
    super(NumberObjectType.MULT);
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
      type: NumberObjectType.MULT,
      factors: factors
    };
  }
}