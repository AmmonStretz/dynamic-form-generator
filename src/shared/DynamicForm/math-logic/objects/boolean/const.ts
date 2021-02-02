import { BooleanObjectKey } from '../../math-naming.class';
import { BooleanObject } from '../../math-object.class';

export class BooleanConst implements BooleanObject {
  constructor(public value: boolean) {}
  calc(params: { [key: string]: any }): boolean {
    return this.value;
  }
  toJson() {
    return {
      key: BooleanObjectKey.CONST,
      value: this.value
    };
  }
}