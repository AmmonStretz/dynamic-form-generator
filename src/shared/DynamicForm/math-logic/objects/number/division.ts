
import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import { NumberObjectType } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class Division extends NumberObject {
  constructor(public divident: NumberObject, public divisor: NumberObject) {
    super(NumberObjectType.DIV);
  }
  calc(pointer: (key: string) => any) {
    let divisor = this.divisor.calc(pointer);
    if (divisor == 0) throw new Error("division by zero");
    return this.divident.calc(pointer) / divisor;
  }
  toJson() {
    return {
      type: NumberObjectType.DIV,
      divident: this.divident.toJson(),
      divisor: this.divisor.toJson()
    };
  }
}