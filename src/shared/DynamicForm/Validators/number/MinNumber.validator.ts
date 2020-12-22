import { Validator } from '../validators.class';

export class MinNumber extends Validator<number> {
  constructor(
    public message: string,
    public value: number,
  ) {
    super('minNumber', message);
  }
  public isValide(value: number): boolean {
    return value >= this.value;
  }

  public toJson() {
    return {
      type: 'MinNumber',
      value: this.value,
      message: this.message
    }
  }
}