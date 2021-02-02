import { StringObjectKey } from '../../math-naming.class';
import { StringObject } from '../../math-object.class';

export class StringVar implements StringObject {
  constructor(public name: string) {}
  calc(params: { [key: string]: any }): string {
    if (!(this.name in params)) throw new Error("var does not exist");
    if (typeof params[this.name] != "string")
      throw new Error("var is not string");
    return params[this.name];
  }
  toJson() {
    return {
      key: StringObjectKey.VAR,
      name: this.name
    };
  }
}