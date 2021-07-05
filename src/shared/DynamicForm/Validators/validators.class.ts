import { MaxNumber } from "./number/MaxNumber.validator";

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
