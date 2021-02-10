import { Validator, ValidatorTypes } from '../validators.class';

export default class EmailString extends Validator<string> {
  constructor(
    public message: string,
  ) {
    super(ValidatorTypes.EMAIL_STRING, message);
  }
  public isValid(value: string): boolean {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(value).toLowerCase());
  }

  public toJson() {
    return {
      type: ValidatorTypes.EMAIL_STRING,
      message: this.message
    }
  }
}