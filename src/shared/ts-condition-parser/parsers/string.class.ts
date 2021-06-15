import { StringCondition as StringCondition } from '../condition.class';
import { StringConst, StringVar } from '../objects/string.class';
import { StringConditionType } from '../math-naming.class';
export abstract class StringConditionParser {
  public static parsers: {[key: string]:(json: any) => StringCondition} = {
    [StringConditionType.VAR]: (json: any) => new StringVar(json.key, json.defaultValue),
    [StringConditionType.CONST]: (json: any) => new StringConst(json.value)
  };
  static fromJson(json: any): StringCondition {
    return this.parsers[json.type](json);
  }
  public static containsParser(type: string) {
    return type in this.parsers;
  }
}
