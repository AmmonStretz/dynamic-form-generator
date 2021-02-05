import { BooleanObjectType } from '../../math-naming.class';
import { BooleanObject } from '../../math-object.class';

export class BooleanVar extends BooleanObject {
  constructor(public key: string) {
    super(BooleanObjectType.VAR);
  }
  calc(params: { [key: string]: any }): boolean {
    if (!(this.key in params)) throw new Error("var does not exist");
    if (typeof params[this.key] != "boolean")
      throw new Error("var is not boolean");
    return params[this.key];
  }
  toJson() {
    return {
      type: this.type,
      key: this.key
    };
  }
}