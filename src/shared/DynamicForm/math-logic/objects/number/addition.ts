import { NumberObjectKey } from '../../math-naming.class';
import { NumberObject } from '../../math-object.class';

export class Addition implements NumberObject {
  public summands: NumberObject[];
  constructor(summands: NumberObject[]) {
    this.summands = summands;
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
      key: NumberObjectKey.ADD,
      summands: summands
    };
  }
}