
import { NumberObjectKey } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class Division implements NumberObject {
  constructor(public divident: NumberObject, public divisor: NumberObject) {}
  calc(params: { [key: string]: any }) {
    let divisor = this.divisor.calc(params);
    if (divisor == 0) throw new Error("division by zero");
    return this.divident.calc(params) / divisor;
  }
  toJson() {
    return {
      key: NumberObjectKey.DIV,
      divident: this.divident.toJson(),
      divisor: this.divisor.toJson()
    };
  }
}