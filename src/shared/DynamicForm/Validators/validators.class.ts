import { MaxNumber } from "./number/MaxNumber.validator";

export enum ValidatorTypes {
  REQUIRED = 'required',
  MAX_NUMBER = 'maxNumber',
  MIN_NUMBER = 'minNumber',
  POSTAL_CODE_NUMBER = 'isPostalCode',
  EMAIL_STRING = "isEmail",
  NOT_IN_LIST = "notInList",
}
export abstract class Validator<T> {
  constructor(
    public type: string,
    public message: string,
  ) { }
  public abstract isValid(value: T): boolean;

  public static checkFieldValidity(value: any, validators: Validator<any>[]) {
    let errors: {type: string, message: string}[] = [];
    validators.forEach(validator => {
      if (!validator.isValid(value)) {
        errors.push({
          type: validator.type,
          message: validator.message,
        })
      }
    });
    return errors;
  }

  public abstract toJson(): any;
}
