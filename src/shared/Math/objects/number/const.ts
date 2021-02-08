import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import { NumberObjectType } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class NumberConst extends NumberObject {
  constructor(public value: number) {
    super(NumberObjectType.CONST);
  }
  calc(pointer: (key: string) => any): number {
    return this.value;
  }
  toJson() {
    return {
      type: NumberObjectType.CONST,
      value: this.value
    };
  }
}