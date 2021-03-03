import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.config';
import { BooleanObjectType } from '../../../math-naming.class';
import { NumberComparator, NumberObject } from '../../../math-object.class';

export class LessThan extends NumberComparator {
  constructor(left: NumberObject, right: NumberObject){
    super(BooleanObjectType.LT, left, right)
  }
  calc(pointer: (key: string) => any): boolean {
    return this.first.calc(pointer) < this.second.calc(pointer);
  }
  toJson() {
    return {
      type: BooleanObjectType.LT,
      first: this.first.toJson(),
      second: this.second.toJson()
    };
  }
}