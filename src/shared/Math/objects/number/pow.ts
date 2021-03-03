import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.config';
import { NumberObjectType } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class Pow extends NumberObject {
  constructor(public base: NumberObject, public exponent: NumberObject) {
    super(NumberObjectType.POW);
  }
  calc(pointer: (key: string) => any) {
    return Math.pow(this.base.calc(pointer), this.exponent.calc(pointer));
  }
  toJson() {
    return {
      type: NumberObjectType.POW,
      base: this.base.toJson(),
      exponent: this.exponent.toJson()
    };
  }
}