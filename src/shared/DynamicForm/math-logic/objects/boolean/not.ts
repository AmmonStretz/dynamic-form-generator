import { BooleanObjectType } from '../../math-naming.class';
import { BooleanObject } from '../../math-object.class';

export class Not extends BooleanObject {
  constructor(public operator: BooleanObject) {
    super(BooleanObjectType.NOT);
  }
  calc(params: { [key: string]: any }) {
    return !this.operator.calc(params);
  }
  toJson() {
    return {
      type: this.type,
      operator: this.operator
    };
  }
}