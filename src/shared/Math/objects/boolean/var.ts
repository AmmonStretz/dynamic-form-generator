import { BooleanObjectType } from '../../math-naming.class';
import { BooleanObject } from '../../math-object.class';

export class BooleanVar extends BooleanObject {
  constructor(public key: string) {
    super(BooleanObjectType.VAR);
  }
  calc(pointer: (key: string) => any): boolean {
    let value = pointer(this.key).value
    return value;
  }
  toJson() {
    return {
      type: this.type,
      key: this.key
    };
  }
}