import { BooleanObjectKey } from '../../math-naming.class';
import { BooleanObject } from '../../math-object.class';

export class Not implements BooleanObject {
  constructor(public operator: BooleanObject) {}
  calc(params: { [key: string]: any }) {
    return !this.operator.calc(params);
  }
  toJson() {
    return {
      key: BooleanObjectKey.NOT,
      operator: this.operator
    };
  }
}