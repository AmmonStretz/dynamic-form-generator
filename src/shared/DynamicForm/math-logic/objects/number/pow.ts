import { NumberObjectKey } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class Pow implements NumberObject {
  constructor(public base: NumberObject, public exponent: NumberObject) {}
  calc(params: { [key: string]: any }) {
    return Math.pow(this.base.calc(params), this.exponent.calc(params));
  }
  toJson() {
    return {
      key: NumberObjectKey.POW,
      base: this.base.toJson(),
      exponent: this.exponent.toJson()
    };
  }
}