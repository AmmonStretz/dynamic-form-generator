import { NumberVar, NumberConst, Addition, Multiplication, Division, Pow, StringLength } from '../objects/number.class';
import { NumberObject } from '../math-object.class';
import { NumberObjectKey } from '../math-naming.class';
import { StringObjectParser } from "./string.class";

export abstract class NumberObjectParser {
  public static parsers: any = {
    [NumberObjectKey.VAR]: (json: any) => new NumberVar(json.name),
    [NumberObjectKey.CONST]: (json: any) => new NumberConst(json.value),
    [NumberObjectKey.ADD]: (json: any) => {
      let summands: NumberObject[] = [];
      json.summands.forEach((s: any) => {
        summands.push(NumberObjectParser.fromJson(s));
      });
      return new Addition(summands);
    },
    [NumberObjectKey.MULT]: (json: any) => {
      let factors: NumberObject[] = [];
      json.factors.forEach((s: any) => {
        factors.push(NumberObjectParser.fromJson(s));
      });
      return new Multiplication(factors);
    },
    [NumberObjectKey.DIV]: (json: any) =>
      new Division(
        NumberObjectParser.fromJson(json.divident),
        NumberObjectParser.fromJson(json.divisor)
      ),
    [NumberObjectKey.POW]: (json: any) =>
      new Pow(
        NumberObjectParser.fromJson(json.base),
        NumberObjectParser.fromJson(json.exponent)
      ),
    [NumberObjectKey.STRING_LENGTH]: (json: any) =>
      new StringLength(StringObjectParser.fromJson(json.str))
  };
  public static fromJson(json: any): NumberObject {
    return this.parsers[json.key](json);
  }
  public static containsParser(key: string) {
    return key in this.parsers;
  }
}
