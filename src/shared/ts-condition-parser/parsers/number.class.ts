import { NumberVar, NumberConst, Addition, Multiplication, Division, Pow, StringLength } from '../objects/number.class';
import { NumberCondition } from '../condition.class';
import { NumberConditionType } from '../math-naming.class';
import { StringConditionParser } from "./string.class";
import { Subtraction } from '../objects/number/subtraction';

export abstract class NumberConditionParser {
  public static parsers: any = {
    [NumberConditionType.VAR]: (json: any) => new NumberVar(json.key, json.defaultValue),
    [NumberConditionType.CONST]: (json: any) => new NumberConst(json.value),
    [NumberConditionType.ADD]: (json: any) => {
      let summands: NumberCondition[] = [];
      json.summands.forEach((s: any) => {
        summands.push(NumberConditionParser.fromJson(s));
      });
      return new Addition(summands);
    },
    [NumberConditionType.MULT]: (json: any) => {
      let factors: NumberCondition[] = [];
      json.factors.forEach((s: any) => {
        factors.push(NumberConditionParser.fromJson(s));
      });
      return new Multiplication(factors);
    },
    [NumberConditionType.DIV]: (json: any) =>
      new Division(
        NumberConditionParser.fromJson(json.divident),
        NumberConditionParser.fromJson(json.divisor)
      ),
    [NumberConditionType.SUB]: (json: any) =>
      new Subtraction(
        NumberConditionParser.fromJson(json.minuend),
        NumberConditionParser.fromJson(json.subtrahend)
      ),
    [NumberConditionType.POW]: (json: any) =>
      new Pow(
        NumberConditionParser.fromJson(json.base),
        NumberConditionParser.fromJson(json.exponent)
      ),
    [NumberConditionType.STRING_LENGTH]: (json: any) =>
      new StringLength(StringConditionParser.fromJson(json.str))
  };
  public static fromJson(json: any): NumberCondition {
    return this.parsers[json.type](json);
  }
  public static containsParser(type: string) {
    return type in this.parsers;
  }
}
