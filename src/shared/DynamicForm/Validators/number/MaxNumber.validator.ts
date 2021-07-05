import { ValidatorPlugin } from '../../Plugin/ValidatorPlugin';
import { Validator } from '../validators.class';

export default {
  install: (Vue: any, options: any) => {
    new ValidatorPlugin(
      'number',
      'maxNumber',
      (message: string, value: number) => new MaxNumber(message, value)
    )
   }
}

export class MaxNumber extends Validator<number> {
  constructor(
    public message: string,
    public value: number,
  ) {
    super('maxNumber', message);
  }

  public isValid(value: number): boolean {
    return value <= this.value;
  }

  public toJson() {
    return {
      type: 'maxNumber',
      value: this.value,
      message: this.message
    }
  }
}