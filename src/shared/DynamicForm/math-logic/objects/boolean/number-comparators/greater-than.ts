import { BooleanObjectKey } from '../../../math-naming.class';
import { NumberComparator } from '../../../math-object.class';

export class GreaterThan extends NumberComparator {
  calc(params: { [key: string]: any }): boolean {
    return this.first.calc(params) > this.second.calc(params);
  }
  toJson() {
    return {
      key: BooleanObjectKey.GT,
      first: this.first.toJson(),
      second: this.second.toJson()
    };
  }
}