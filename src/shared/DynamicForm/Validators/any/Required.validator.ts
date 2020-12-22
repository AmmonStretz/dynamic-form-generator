import { Validator } from '../validators.class';

export class Required extends Validator<any> {
  constructor(
    public message: string,
  ) {
    super('required', message);
  }
  public isValide(value: any): boolean {
    return value != null && value != undefined;
  }

  public toJson() {
    return {
      type: 'Require',
      message: this.message
    }
  }
}