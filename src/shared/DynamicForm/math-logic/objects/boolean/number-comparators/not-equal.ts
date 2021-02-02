import { BooleanObjectKey } from '../../../math-naming.class';
import { StringObject } from '../../../math-object.class';
import { Comparator, NumberObject } from '../../../math-object.class';

export class NotEqual extends Comparator<NumberObject | StringObject> {
  calc(params: { [key: string]: any }): boolean {
    return this.first.calc(params) != this.second.calc(params);
  }
  toJson() {
    return {
      key: BooleanObjectKey.NE,
      first: this.first.toJson(),
      second: this.second.toJson()
    };
  }
}