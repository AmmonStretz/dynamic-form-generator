import { NumberObjectType } from '../../math-naming.class';
import { NumberObject, StringObject } from '../../math-object.class';

export class StringLength extends NumberObject {
  constructor(public str: StringObject) {
    super(NumberObjectType.STRING_LENGTH);
  }
  calc(params: { [key: string]: any }): number {
    return this.str.calc(params).length;
  }
  toJson() {
    return {
      type: NumberObjectType.STRING_LENGTH,
      str: this.str
    };
  }
}