import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import { extend } from 'vue/types/umd';
import { StringObjectType } from '../../math-naming.class';
import { StringObject } from '../../math-object.class';

export class StringConst extends StringObject {
  constructor(public value: string) {
    super(StringObjectType.CONST);
  }
  calc(pointer: (key: string) => any): string {
    return this.value;
  }
  toJson() {
    return {
      type: StringObjectType.CONST,
      value: this.value
    };
  }
}
