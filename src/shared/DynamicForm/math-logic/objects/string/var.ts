import { StringObjectType } from '../../math-naming.class';
import { StringObject } from '../../math-object.class';

export class StringVar extends StringObject {
  constructor(public name: string) {
    super(StringObjectType.VAR);
  }
  calc(params: { [key: string]: any }): string {
    if (!(this.name in params)) throw new Error("var does not exist");
    if (typeof params[this.name] != "string")
      throw new Error("var is not string");
    return params[this.name];
  }
  toJson() {
    return {
      type: StringObjectType.VAR,
      name: this.name
    };
  }
}