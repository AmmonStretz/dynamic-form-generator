import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.config';
import { NumberObjectType } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class Addition extends NumberObject {
  constructor(public summands: NumberObject[]) {
    super(NumberObjectType.ADD);
  }
  calc(pointer: (key: string) => any) {
    let summ = 0;
    this.summands.forEach(summand => {
      summ += summand.calc(pointer);
    });
    return summ;
  }
  toJson() {
    let summands: any = [];
    this.summands.forEach(s => {
      summands.push(s.toJson());
    });
    return {
      type: NumberObjectType.ADD,
      summands: summands
    };
  }
}