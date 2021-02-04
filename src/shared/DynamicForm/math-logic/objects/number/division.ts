
import { NumberObjectType } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class Division extends NumberObject {
  constructor(public divident: NumberObject, public divisor: NumberObject) {
    super(NumberObjectType.DIV);
  }
  calc(params: { [key: string]: any }) {
    let divisor = this.divisor.calc(params);
    if (divisor == 0) throw new Error("division by zero");
    return this.divident.calc(params) / divisor;
  }
  toJson() {
    return {
      type: NumberObjectType.DIV,
      divident: this.divident.toJson(),
      divisor: this.divisor.toJson()
    };
  }
}