import { MinNumber } from './number/MinNumber.validator';
import { MaxNumber } from './number/MaxNumber.validator';
import EmailString from './string/EmailString.validator';
import { Required } from './any/Required.validator';
import { Validator, ValidatorTypes } from './validators.class';
import { PostalCodeNumber } from './number/PostalCodeNumber.validator';
export class ValidatorParser {
  public static parseFromJSONArray(jsonArray: {
    type: string,
    message: string,
    value?: any
  }[]): Validator<any>[] {
    let result: Validator<any>[] = [];
    jsonArray.forEach(json => {
      result.push(this.parseFromJSON(json));
    });
    return result;
  }
  public static parseFromJSON(json: {
    type: string,
    message: string,
    value?: any
  }): Validator<any> {
    switch (json.type) {
      case ValidatorTypes.MAX_NUMBER:
        return new MaxNumber(json.message, json.value);
      case ValidatorTypes.MIN_NUMBER:
        return new MinNumber(json.message, json.value);
      case ValidatorTypes.POSTAL_CODE_NUMBER:
        return new PostalCodeNumber(json.message, json.value);
      case ValidatorTypes.EMAIL_STRING:
        return new EmailString(json.message);
      default:
        return new Required(json.message);
    }
  }
}