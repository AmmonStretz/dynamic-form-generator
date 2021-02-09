import { StringObject } from '../math-object.class';
import { StringVar } from '../objects/string.class';
import { StringObjectType } from '../math-naming.class';
export abstract class StringObjectParser {
  public static parsers: any = {
    [StringObjectType.VAR]: (json: any) => new StringVar(json.key, json.defaultValue),
    [StringObjectType.CONST]: (json: any) => new StringVar(json.value)
  };
  static fromJson(json: any): StringObject {
    return this.parsers[json.type];
  }
  public static containsParser(type: string) {
    return type in this.parsers;
  }
}
