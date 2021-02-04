export abstract class MathObject<T> {
  constructor(public type: string) {}
  abstract calc(params: { [key: string]: any }): T;
  abstract toJson(): any;
}
export abstract class BooleanObject extends MathObject<boolean> {
  abstract calc(params: { [key: string]: any }): boolean;
}
export abstract class NumberObject extends MathObject<number> {
  abstract calc(params: { [key: string]: any }): number;
}
export abstract class StringObject extends MathObject<string> {
  abstract calc(params: { [key: string]: any }): string;
}
export abstract class Comparator<T> extends BooleanObject {
  constructor(public type: string, public first: T, public second: T) {
    super(type);
  }
  abstract calc(params: { [key: string]: any }): boolean;
  abstract toJson(): any;
}
export abstract class NumberComparator extends Comparator<NumberObject> {
  abstract calc(params: { [key: string]: any }): boolean;
}
