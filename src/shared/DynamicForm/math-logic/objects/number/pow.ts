import { NumberObjectType } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class Pow extends NumberObject {
  constructor(public base: NumberObject, public exponent: NumberObject) {
    super(NumberObjectType.POW);
  }
  calc(params: { [key: string]: any }) {
    return Math.pow(this.base.calc(params), this.exponent.calc(params));
  }
  toJson() {
    return {
      type: NumberObjectType.POW,
      base: this.base.toJson(),
      exponent: this.exponent.toJson()
    };
  }
}