import { NumberVar, NumberConst, Addition, Multiplication, Division, Pow, StringLength } from '../objects/number.class';
import { NumberObject } from '../math-object.class';
import { NumberObjectType } from '../math-naming.class';
import { StringObjectParser } from "./string.class";

export abstract class NumberObjectParser {
  public static parsers: any = {
    [NumberObjectType.VAR]: (json: any) => new NumberVar(json.key, json.defaultValue),
    [NumberObjectType.CONST]: (json: any) => new NumberConst(json.value),
    [NumberObjectType.ADD]: (json: any) => {
      let summands: NumberObject[] = [];
      json.summands.forEach((s: any) => {
        summands.push(NumberObjectParser.fromJson(s));
      });
      return new Addition(summands);
    },
    [NumberObjectType.MULT]: (json: any) => {
      let factors: NumberObject[] = [];
      json.factors.forEach((s: any) => {
        factors.push(NumberObjectParser.fromJson(s));
      });
      return new Multiplication(factors);
    },
    [NumberObjectType.DIV]: (json: any) =>
      new Division(
        NumberObjectParser.fromJson(json.divident),
        NumberObjectParser.fromJson(json.divisor)
      ),
    [NumberObjectType.POW]: (json: any) =>
      new Pow(
        NumberObjectParser.fromJson(json.base),
        NumberObjectParser.fromJson(json.exponent)
      ),
    [NumberObjectType.STRING_LENGTH]: (json: any) =>
      new StringLength(StringObjectParser.fromJson(json.str))
  };
  public static fromJson(json: any): NumberObject {    
    return this.parsers[json.type](json);
  }
  public static containsParser(type: string) {
    return type in this.parsers;
  }
}
