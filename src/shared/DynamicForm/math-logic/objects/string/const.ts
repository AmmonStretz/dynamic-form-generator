import { StringObjectKey } from '../../math-naming.class';
import { StringObject } from '../../math-object.class';

export class StringConst implements StringObject {
  constructor(public value: string) {}
  calc(params: { [key: string]: any }): string {
    return this.value;
  }
  toJson() {
    return {
      key: StringObjectKey.CONST,
      value: this.value
    };
  }
}
