import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import { NumberObjectType } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class NumberVar extends NumberObject {
  constructor(public key: string) {
    super(NumberObjectType.VAR);
  }
  calc(pointer: (key: string) => any): number {
    let value = pointer(this.key).value;
    return value;
  }
  toJson() {
    return {
      type: NumberObjectType.VAR,
      key: this.key
    };
  }
}