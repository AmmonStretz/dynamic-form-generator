import { NumberObjectType } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class Addition extends NumberObject {
  constructor(public summands: NumberObject[]) {
    super(NumberObjectType.ADD);
  }
  calc(params: { [key: string]: any }) {
    let summ = 0;
    this.summands.forEach(summand => {
      summ += summand.calc(params);
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