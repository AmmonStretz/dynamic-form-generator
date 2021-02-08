import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import { BooleanObjectType } from '../../../math-naming.class';
import { NumberComparator, NumberObject } from '../../../math-object.class';

export class LessEqual extends NumberComparator {
  constructor(left: NumberObject, right: NumberObject){
    super(BooleanObjectType.LE, left, right)
  }
  calc(pointer: (key: string) => any): boolean {
    return this.first.calc(pointer) <= this.second.calc(pointer);
  }
  toJson() {
    return {
      type: BooleanObjectType.LE,
      first: this.first.toJson(),
      second: this.second.toJson()
    };
  }
}