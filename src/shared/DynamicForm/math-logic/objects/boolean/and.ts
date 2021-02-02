import { BooleanObjectKey } from '../../math-naming.class';
import { BooleanObject } from '../../math-object.class';

export class And implements BooleanObject {
  public operators: BooleanObject[];
  constructor(operators: BooleanObject[]) {
    this.operators = operators;
  }
  calc(params: { [key: string]: any }) {
    let result = true;
    this.operators.forEach(operator => {
      result = result && operator.calc(params);
    });
    return result;
  }
  toJson() {
    let operators: any = [];
    this.operators.forEach(s => {
      operators.push(s.toJson());
    });
    return {
      key: BooleanObjectKey.AND,
      operators: operators
    };
  }
}