import { BooleanObjectType } from '../../../math-naming.class';
import { NumberComparator, NumberObject } from '../../../math-object.class';

export class GreaterEqual extends NumberComparator {
  constructor(left: NumberObject, right: NumberObject){
    super(BooleanObjectType.GE, left, right)
  }
  calc(params: { [key: string]: any }): boolean {
    return this.first.calc(params) >= this.second.calc(params);
  }
  toJson() {
    return {
      type: BooleanObjectType.GE,
      first: this.first.toJson(),
      second: this.second.toJson()
    };
  }
}