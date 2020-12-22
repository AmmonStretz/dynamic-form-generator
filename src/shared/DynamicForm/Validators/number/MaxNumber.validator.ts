import { Validator } from '../validators.class';

export class MaxNumber extends Validator<number> {
  constructor(
    public message: string,
    public value: number,
    ) {
      super('maxNumber', message);
    }
    public isValide(value: number): boolean {
      return value <= this.value;
    }
    
    public toJson() {
      return {
        type: 'MaxNumber',
        value: this.value,
        message: this.message
      }
    }
}