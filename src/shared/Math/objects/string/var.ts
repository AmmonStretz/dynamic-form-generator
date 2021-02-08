import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import { StringObjectType } from '../../math-naming.class';
import { StringObject } from '../../math-object.class';

export class StringVar extends StringObject {
  constructor(public key: string) {
    super(StringObjectType.VAR);
  }
  calc(pointer: (key: string) => any): string {
    let value = pointer(this.key).value;
    return value;
  }
  toJson() {
    return {
      type: StringObjectType.VAR,
      name: this.key
    };
  }
}