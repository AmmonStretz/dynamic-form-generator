import { NumberObjectKey } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class NumberConst implements NumberObject {
  constructor(public value: number) {}
  calc(params: { [key: string]: any }): number {
    return this.value;
  }
  toJson() {
    return {
      key: NumberObjectKey.CONST,
      value: this.value
    };
  }
}