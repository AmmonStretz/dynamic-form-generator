
import { NumberObjectKey } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class Multiplication implements NumberObject {
  public factors: NumberObject[];
  constructor(factors: NumberObject[]) {
    this.factors = factors;
  }
  calc(params: { [key: string]: any }) {
    let product = 1;
    this.factors.forEach(factor => {
      product *= factor.calc(params);
    });
    return product;
  }
  toJson() {
    let factors: any = [];
    this.factors.forEach(s => {
      factors.push(s.toJson());
    });
    return {
      key: NumberObjectKey.MULT,
      factors: factors
    };
  }
}