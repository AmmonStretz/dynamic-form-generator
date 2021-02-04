
import { extend } from 'vue/types/umd';
import { NumberObjectType } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class NumberVar extends NumberObject {
  constructor(public name: string) {
    super(NumberObjectType.VAR);
  }
  calc(params: { [key: string]: any }): number {
    if (!(this.name in params)) throw new Error("var does not exist");
    if (typeof params[this.name] != "number")
      throw new Error("var is not number");
    return params[this.name];
  }
  toJson() {
    return {
      type: NumberObjectType.VAR,
      name: this.name
    };
  }
}