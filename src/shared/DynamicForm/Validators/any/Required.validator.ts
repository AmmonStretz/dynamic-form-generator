import { Validator, ValidatorTypes } from '../validators.class';

export class Required extends Validator<any> {
  constructor(
    public message: string,
  ) {
    super(ValidatorTypes.REQUIRED, message);
  }
  public isValid(value: any): boolean {
    return value != null && value != undefined && value != "";
  }

  public toJson() {
    return {
      type: ValidatorTypes.REQUIRED,
      message: this.message
    }
  }
  public static fromJson(json: {message: string}): Required {
    let val = Object.create(Required.prototype);
    return Object.assign(val, json, {})
  }
}