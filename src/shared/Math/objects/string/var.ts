import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.config';
import { StringObjectType } from '../../math-naming.class';
import { StringObject } from '../../math-object.class';

export class StringVar extends StringObject {
  constructor(public key: string, public defaultValue: string = '') {
    super(StringObjectType.VAR);
  }
  calc(pointer: (key: string) => any): string {
    let value = pointer(this.key);
    return value? value.value: this.defaultValue;
  }
  toJson() {
    return {
      type: StringObjectType.VAR,
      name: this.key
    };
  }
}