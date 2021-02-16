import { Validator, ValidatorTypes } from '../validators.class';

export class PostalCodeNumber extends Validator<number> {
  constructor(
    public message: string,
    public value: number,
  ) {
    super(ValidatorTypes.MIN_NUMBER, message);
  }
  public isValid(value: number): boolean {
    return /^[0-9]{5}$/.test(''+value);
  }

  public toJson() {
    return {
      type: ValidatorTypes.POSTAL_CODE_NUMBER,
      value: this.value,
      message: this.message
    }
  }
}