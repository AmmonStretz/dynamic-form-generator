import { BooleanObjectType } from '../../math-naming.class';
import { BooleanObject } from '../../math-object.class';

export class BooleanConst extends BooleanObject {
  constructor(public value: boolean) {
    super(BooleanObjectType.CONST);
  }
  calc(params: { [key: string]: any }): boolean {
    return this.value;
  }
  toJson() {
    return {
      type: this.type,
      value: this.value
    };
  }
}