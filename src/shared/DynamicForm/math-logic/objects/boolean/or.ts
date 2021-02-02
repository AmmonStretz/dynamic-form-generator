import { BooleanObjectKey } from '../../math-naming.class';
import { BooleanObject } from '../../math-object.class';

export class Or implements BooleanObject {
  public operators: BooleanObject[];
  constructor(operators: BooleanObject[]) {
    this.operators = operators;
  }
  calc(params: { [key: string]: any }) {
    let result = false;
    this.operators.forEach(operator => {
      result = result || operator.calc(params);
    });
    return result;
  }
  toJson() {
    let operators: any = [];
    this.operators.forEach(s => {
      operators.push(s.toJson());
    });
    return {
      key: BooleanObjectKey.OR,
      operators: operators
    };
  }
}