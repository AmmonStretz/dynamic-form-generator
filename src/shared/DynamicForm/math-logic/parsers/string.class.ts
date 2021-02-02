import { StringObject } from '../math-object.class';
import { StringVar } from '../objects/string.class';
import { StringObjectKey } from '../math-naming.class';
export abstract class StringObjectParser {
  public static parsers: any = {
    [StringObjectKey.VAR]: (json: any) => new StringVar(json.name),
    [StringObjectKey.CONST]: (json: any) => new StringVar(json.value)
  };
  static fromJson(json: any): StringObject {
    return this.parsers[json.key];
  }
  public static containsParser(key: string) {
    return key in this.parsers;
  }
}
