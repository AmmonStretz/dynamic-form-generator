import { Validator } from '../validators.class';

/**
 * private Validator
 * TODO: make Plugin
 */

export class NotInList extends Validator<string> {
  constructor(
    public message: string,
    public value: string[]
  ) {
    super('notInList', message);
  }
  public isValid(value: string): boolean {
    return !this.value.includes(value);
  }

  public toJson() {
    return {
      type: 'notInList',
      message: this.message,
      value: this.value,
    }
  }
}