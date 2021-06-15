export abstract class Condition<T> {
  constructor(public type: string) {}
  abstract calc(pointer: (key: string)=>any): T;
  abstract toJson(): any;
}
export abstract class BooleanCondition extends Condition<boolean> {
  abstract calc(pointer: (key: string)=>any): boolean;
}
export abstract class NumberCondition extends Condition<number> {
  abstract calc(pointer: (key: string)=>any): number;
}
export abstract class StringCondition extends Condition<string> {
  abstract calc(pointer: (key: string)=>any): string;
}
export abstract class Comparator<T> extends BooleanCondition {
  constructor(public type: string, public first: T, public second: T) {
    super(type);
  }
  abstract calc(pointer: (key: string)=>any): boolean;
  abstract toJson(): any;
}
export abstract class NumberComparator extends Comparator<NumberCondition> {
  abstract calc(pointer: (key: string)=>any): boolean;
}
