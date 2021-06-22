import { Validator, ValidatorTypes } from '../validators.class';

export default class NotInList extends Validator<string> {
  constructor(
    public message: string,
    public value: string[]
  ) {
    super(ValidatorTypes.NOT_IN_LIST, message);
  }
  public isValid(value: string): boolean {
    return !this.value.includes(value);
  }

  public toJson() {
    return {
      type: ValidatorTypes.NOT_IN_LIST,
      message: this.message,
      value: this.value,
    }
  }
}