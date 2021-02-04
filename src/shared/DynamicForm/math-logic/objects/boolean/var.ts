import { BooleanObjectType } from '../../math-naming.class';
import { BooleanObject } from '../../math-object.class';

export class BooleanVar extends BooleanObject {
  constructor(public name: string) {
    super(BooleanObjectType.VAR);
  }
  calc(params: { [key: string]: any }): boolean {
    if (!(this.name in params)) throw new Error("var does not exist");
    if (typeof params[this.name] != "boolean")
      throw new Error("var is not boolean");
    return params[this.name];
  }
  toJson() {
    return {
      type: this.type,
      name: this.name
    };
  }
}