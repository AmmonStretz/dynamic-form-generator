import { Validator, ValidatorTypes } from '../validators.class';

export class MinNumber extends Validator<number> {
  constructor(
    public message: string,
    public value: number,
  ) {
    super(ValidatorTypes.MIN_NUMBER, message);
  }
  public isValid(value: number): boolean {
    return value >= this.value;
  }

  public toJson() {
    return {
      type: ValidatorTypes.MIN_NUMBER,
      value: this.value,
      message: this.message
    }
  }
}