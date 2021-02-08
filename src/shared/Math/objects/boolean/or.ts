import { BooleanObjectType } from '../../math-naming.class';
import { BooleanObject } from '../../math-object.class';

export class Or extends BooleanObject {
  public operators: BooleanObject[];
  constructor(operators: BooleanObject[]) {
    super(BooleanObjectType.OR);
    this.operators = operators;
  }
  calc(pointer: (key: string) => any) {
    let result = false;
    this.operators.forEach(operator => {
      result = result || operator.calc(pointer);
    });
    return result;
  }
  toJson() {
    let operators: any = [];
    this.operators.forEach(s => {
      operators.push(s.toJson());
    });
    return {
      type: this.type,
      operators: operators
    };
  }
}