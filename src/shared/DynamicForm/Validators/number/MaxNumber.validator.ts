import { Validator, ValidatorTypes } from '../validators.class';

export class MaxNumber extends Validator<number> {
  constructor(
    public message: string,
    public value: number,
  ) {
    super(ValidatorTypes.MAX_NUMBER, message);
  }
  public isValid(value: number): boolean {
    return value <= this.value;
  }

  public toJson() {
    return {
      type: ValidatorTypes.MAX_NUMBER,
      value: this.value,
      message: this.message
    }
  }
}