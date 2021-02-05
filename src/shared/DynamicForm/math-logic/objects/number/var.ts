
import { extend } from 'vue/types/umd';
import { NumberObjectType } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class NumberVar extends NumberObject {
  constructor(public key: string) {
    super(NumberObjectType.VAR);
  }
  calc(params: { [key: string]: any }): number {
    if (!(this.key in params)) throw new Error("var does not exist");
    return params[this.key];
  }
  toJson() {
    return {
      type: NumberObjectType.VAR,
      key: this.key
    };
  }
}