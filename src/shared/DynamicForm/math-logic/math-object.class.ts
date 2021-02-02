export interface MathObject<T> {
  calc(params: { [key: string]: any }): T;
  toJson(): any;
}
export interface BooleanObject extends MathObject<boolean> {
  calc(params: { [key: string]: any }): boolean;
}
export interface NumberObject extends MathObject<number> {
  calc(params: { [key: string]: any }): number;
}
export interface StringObject extends MathObject<string> {
  calc(params: { [key: string]: any }): string;
}
export abstract class Comparator<T> implements BooleanObject {
  constructor(public first: T, public second: T) {}
  abstract calc(params: { [key: string]: any }): boolean;
  abstract toJson(): any;
}
export abstract class NumberComparator extends Comparator<NumberObject> {
  abstract calc(params: { [key: string]: any }): boolean;
}
