import { ValidatorParser } from './validator.parser';
import { Validator, ValidatorTypes } from './validators.class';
import { Required } from './any/Required.validator';
import { MinNumber } from './number/MinNumber.validator';
import EmailString from './string/EmailString.validator';
import { MaxNumber } from './number/MaxNumber.validator';
export {
  MaxNumber,
  MinNumber,
  Required,
  EmailString,
  Validator,
  ValidatorTypes,
  ValidatorParser,
}