import { NumberObjectKey } from '../../math-naming.class';
import { NumberObject, StringObject } from '../../math-object.class';

export class StringLength implements NumberObject {
  constructor(public str: StringObject) {}
  calc(params: { [key: string]: any }): number {
    return this.str.calc(params).length;
  }
  toJson() {
    return {
      key: NumberObjectKey.STRING_LENGTH,
      str: this.str
    };
  }
}