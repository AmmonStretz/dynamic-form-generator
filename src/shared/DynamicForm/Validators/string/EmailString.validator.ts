import { ValidatorPlugin } from '../../Plugin/ValidatorPlugin';
import { Validator } from '../validators.class';

export default {
  install: (Vue: any, options: any) => {
    new ValidatorPlugin(
      'string',
      'isEmail',
      (message: string) => new EmailString(message)
    )
   }
}

export class EmailString extends Validator<string> {
  constructor(
    public message: string,
  ) {
    super('isEmail', message);
  }
  public isValid(value: string): boolean {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(value).toLowerCase());
  }

  public toJson() {
    return {
      type: 'isEmail',
      message: this.message
    }
  }
}