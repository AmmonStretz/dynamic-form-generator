import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import { NumberObjectType } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class NumberVar extends NumberObject {
  constructor(public key: string, public defaultValue: number = 0) {
    super(NumberObjectType.VAR);
  }
  calc(pointer: (key: string) => any): number {
    const value = pointer(this.key);
    return value? value: this.defaultValue;
  }
  toJson() {
    return {
      type: NumberObjectType.VAR,
      key: this.key
    };
  }
}