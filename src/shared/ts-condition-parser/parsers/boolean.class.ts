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
        NumberConditionParser.fromJson(json.left),
        NumberConditionParser.fromJson(json.right)
      ),
    [BooleanConditionType.GE]: (json: any) =>
      new GreaterEqual(
        NumberConditionParser.fromJson(json.left),
        NumberConditionParser.fromJson(json.right)
      ),
    [BooleanConditionType.LT]: (json: any) =>
      new LessThan(
        NumberConditionParser.fromJson(json.left),
        NumberConditionParser.fromJson(json.right)
      ),
    [BooleanConditionType.LE]: (json: any) =>
      new LessEqual(
        NumberConditionParser.fromJson(json.left),
        NumberConditionParser.fromJson(json.right)
      ),
    [BooleanConditionType.EQ]: (json: any) => {
      if (json.left.type.startsWith("string") && json.left.type.startsWith("string")) {
        if (
          StringConditionParser.containsParser(json.left.type) &&
          StringConditionParser.containsParser(json.right.type)
        ) {
          return new Equal(
            StringConditionParser.fromJson(json.left),
            StringConditionParser.fromJson(json.right)
          );
        }
      }
      if (
        NumberConditionParser.containsParser(json.left.type) &&
        NumberConditionParser.containsParser(json.right.type)
      ) {
        return new Equal(
          NumberConditionParser.fromJson(json.left),
          NumberConditionParser.fromJson(json.right)
        );
      }
    },
    [BooleanConditionType.NE]: (json: any) => {
      if (
        NumberConditionParser.containsParser(json.left.type) &&
        NumberConditionParser.containsParser(json.right.type)
      ) {
        return new NotEqual(
          NumberConditionParser.fromJson(json.left),
          NumberConditionParser.fromJson(json.right)
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
