import { ValidatorPlugin } from '../../Plugin/ValidatorPlugin';
import { Validator } from '../validators.class';

export default {
  install: (Vue: any, options: any) => {
    new ValidatorPlugin(
      'number',
      'minNumber',
      (message: string, value: number) => new MinNumber(message, value)
    )
   }
}

export class MinNumber extends Validator<number> {
  constructor(
    public message: string,
    public value: number,
  ) {
    super('minNumber', message);
  }
  public isValid(value: number): boolean {
    return value >= this.value;
  }

  public toJson() {
    return {
      type: 'minNumber',
      value: this.value,
      message: this.message
    }
  }
}