import { BooleanObjectType } from '../../math-naming.class';
import { BooleanObject } from '../../math-object.class';

export class BooleanVar extends BooleanObject {
  constructor(public key: string, public defaultValue: boolean = false) {
    super(BooleanObjectType.VAR);
  }
  calc(pointer: (key: string) => any): boolean {
    const value = pointer(this.key)
    return !!value ? value : this.defaultValue;
  }
  toJson() {
    return {
      type: this.type,
      key: this.key
    };
  }
}