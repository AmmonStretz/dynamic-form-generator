import { BooleanObjectType } from '../../../math-naming.class';
import { NumberComparator, NumberObject } from '../../../math-object.class';

export class GreaterEqual extends NumberComparator {
  constructor(left: NumberObject, right: NumberObject){
    super(BooleanObjectType.GE, left, right)
  }
  calc(pointer: (key: string) => any): boolean {
    return this.first.calc(pointer) >= this.second.calc(pointer);
  }
  toJson() {
    return {
      type: BooleanObjectType.GE,
      first: this.first.toJson(),
      second: this.second.toJson()
    };
  }
}