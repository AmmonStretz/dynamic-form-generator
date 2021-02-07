import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import { BooleanObjectType } from '../../../math-naming.class';
import { StringObject } from '../../../math-object.class';
import { Comparator, NumberObject } from '../../../math-object.class';

export class NotEqual extends Comparator<NumberObject | StringObject> {
  constructor(left: NumberObject | StringObject, right: NumberObject | StringObject){
    super(BooleanObjectType.NE, left, right)
  }
  calc(pointer: (key: string) => any): boolean {
    return this.first.calc(pointer) != this.second.calc(pointer);
  }
  toJson() {
    return {
      type: BooleanObjectType.NE,
      first: this.first.toJson(),
      second: this.second.toJson()
    };
  }
}