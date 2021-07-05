import { Validator } from '../validators.class';
import { ValidatorPlugin } from "@/shared/DynamicForm/Plugin/ValidatorPlugin"

export default {
  install: (Vue: any, options: any) => {
    new ValidatorPlugin(
      'any',
      'required',
      (message: string) => new Required(message),
      'Dieses Feld muss ausgefüllt werden'
    )
   }
}

export class Required extends Validator<any> {
  constructor(
    public message: string,
  ) {
    super('required', message);
  }
  public isValid(value: any): boolean {
    return value != null && value != undefined && value != "" || value == 0;
  }

  public toJson() {
    return {
      type: 'required',
      message: this.message
    }
  }
  public static fromJson(json: {message: string}): Required {
    let val = Object.create(Required.prototype);
    return Object.assign(val, json, {})
  }
}