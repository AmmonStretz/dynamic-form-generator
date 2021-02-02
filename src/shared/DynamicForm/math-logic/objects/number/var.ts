
import { NumberObjectKey } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class NumberVar implements NumberObject {
  constructor(public name: string) {}
  calc(params: { [key: string]: any }): number {
    if (!(this.name in params)) throw new Error("var does not exist");
    if (typeof params[this.name] != "number")
      throw new Error("var is not number");
    return params[this.name];
  }
  toJson() {
    return {
      key: NumberObjectKey.VAR,
      name: this.name
    };
  }
}