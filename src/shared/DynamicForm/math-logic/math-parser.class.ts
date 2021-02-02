import { MathObject } from './math-object.class';
import { NumberObjectParser } from './parsers/number.class';
import { StringObjectParser } from './parsers/string.class';
import { BooleanObjectParser } from './parsers/boolean.class';

export abstract class MathParser {
  static fromJson(json: any): MathObject<any> {
    if(NumberObjectParser.containsParser(json.key)){
      return NumberObjectParser.fromJson(json)
    }else if(StringObjectParser.containsParser(json.key)){
      return StringObjectParser.fromJson(json)
    }else if(BooleanObjectParser.containsParser(json.key)){
      return BooleanObjectParser.fromJson(json)
    }
    throw new Error('Math Object does not exist in Parsers');
  }
}
