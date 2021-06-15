import { Condition } from './condition.class';
import { NumberConditionParser } from './parsers/number.class';
import { StringConditionParser } from './parsers/string.class';
import { BooleanConditionParser } from './parsers/boolean.class';

export abstract class ConditionParser {
  static fromJson(json: any): Condition<any> {
    if(NumberConditionParser.containsParser(json.type)){
      return NumberConditionParser.fromJson(json)
    }else if(StringConditionParser.containsParser(json.type)){
      return StringConditionParser.fromJson(json)
    }else if(BooleanConditionParser.containsParser(json.type)){
      return BooleanConditionParser.fromJson(json)
    }
    throw new Error('Condition does not exist in Parsers');
  }
}
