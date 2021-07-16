import { BooleanCondition } from '../condition.class';
import {
  BooleanVar,
  BooleanConst,
  Not,
  And,
  Or,
  GreaterEqual,
  GreaterThan,
  LessEqual,
  LessThan,
  Equal,
  NotEqual,
} from '../objects/boolean.class';
import { BooleanConditionType } from '../math-naming.class';
import { NumberConditionParser } from './number.class';
import { StringConditionParser } from './string.class';

export abstract class BooleanConditionParser {
  public static parsers: any = {
    [BooleanConditionType.VAR]: (json: any) => new BooleanVar(json.key, json.defaultValue),
    [BooleanConditionType.CONST]: (json: any) => new BooleanConst(json.value),
    [BooleanConditionType.NOT]: (json: any) =>
      new Not(BooleanConditionParser.fromJson(json.operator)),
    [BooleanConditionType.AND]: (json: any) => {
      let operators: BooleanCondition[] = [];
      json.operators.forEach((o: any) => {
        operators.push(BooleanConditionParser.fromJson(o));
      });
      return new And(operators);
    },
    [BooleanConditionType.OR]: (json: any) => {
      let operators: BooleanCondition[] = [];
      json.operators.forEach((o: any) => {
        operators.push(BooleanConditionParser.fromJson(o));
      });
      return new Or(operators);
    },
    //Comparators
    [BooleanConditionType.GT]: (json: any) =>
      new GreaterThan(
        NumberConditionParser.fromJson(json.first),
        NumberConditionParser.fromJson(json.second)
      ),
    [BooleanConditionType.GE]: (json: any) =>
      new GreaterEqual(
        NumberConditionParser.fromJson(json.first),
        NumberConditionParser.fromJson(json.second)
      ),
    [BooleanConditionType.LT]: (json: any) =>
      new LessThan(
        NumberConditionParser.fromJson(json.first),
        NumberConditionParser.fromJson(json.second)
      ),
    [BooleanConditionType.LE]: (json: any) =>
      new LessEqual(
        NumberConditionParser.fromJson(json.first),
        NumberConditionParser.fromJson(json.second)
      ),
    [BooleanConditionType.EQ]: (json: any) => {
      if (json.first.type.startsWith("string") && json.first.type.startsWith("string")) {
        if (
          StringConditionParser.containsParser(json.first.type) &&
          StringConditionParser.containsParser(json.second.type)
        ) {
          return new Equal(
            StringConditionParser.fromJson(json.first),
            StringConditionParser.fromJson(json.second)
          );
        }
      }
      if (json.first.type.startsWith("boolean") && json.first.type.startsWith("boolean")) {
        if (
          BooleanConditionParser.containsParser(json.first.type) &&
          BooleanConditionParser.containsParser(json.second.type)
        ) {
          return new Equal(
            BooleanConditionParser.fromJson(json.first),
            BooleanConditionParser.fromJson(json.second)
          );
        }
      }
      if (
        NumberConditionParser.containsParser(json.first.type) &&
        NumberConditionParser.containsParser(json.second.type)
      ) {
        return new Equal(
          NumberConditionParser.fromJson(json.first),
          NumberConditionParser.fromJson(json.second)
        );
      }
    },
    [BooleanConditionType.NE]: (json: any) => {
      if (json.first.type.startsWith("string") && json.first.type.startsWith("string")) {
        if (
          StringConditionParser.containsParser(json.first.type) &&
          StringConditionParser.containsParser(json.second.type)
        ) {
          return new NotEqual(
            StringConditionParser.fromJson(json.first),
            StringConditionParser.fromJson(json.second)
          );
        }
      }
      if (json.first.type.startsWith("boolean") && json.first.type.startsWith("boolean")) {
        if (
          BooleanConditionParser.containsParser(json.first.type) &&
          BooleanConditionParser.containsParser(json.second.type)
        ) {
          return new NotEqual(
            BooleanConditionParser.fromJson(json.first),
            BooleanConditionParser.fromJson(json.second)
          );
        }
      }
      if (
        NumberConditionParser.containsParser(json.first.type) &&
        NumberConditionParser.containsParser(json.second.type)
      ) {
        return new NotEqual(
          NumberConditionParser.fromJson(json.first),
          NumberConditionParser.fromJson(json.second)
        );
      }
    }
  };
  public static fromJson(json: any): BooleanCondition {
    return this.parsers[json.type](json);
  }
  public static containsParser(type: string) {
    return type in this.parsers;
  }
}
