import { BooleanObject } from '../math-object.class';
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
import { BooleanObjectType } from '../math-naming.class';
import { NumberObjectParser } from './number.class';
import { StringObjectParser } from './string.class';

export abstract class BooleanObjectParser {
  public static parsers: any = {
    [BooleanObjectType.VAR]: (json: any) => new BooleanVar(json.key, json.defaultValue),
    [BooleanObjectType.CONST]: (json: any) => new BooleanConst(json.value),
    [BooleanObjectType.NOT]: (json: any) =>
      new Not(BooleanObjectParser.fromJson(json.operator)),
    [BooleanObjectType.AND]: (json: any) => {
      let operators: BooleanObject[] = [];
      json.operators.forEach((o: any) => {
        operators.push(BooleanObjectParser.fromJson(o));
      });
      return new And(operators);
    },
    [BooleanObjectType.OR]: (json: any) => {
      let operation: BooleanObject[] = [];
      json.operation.forEach((o: any) => {
        operation.push(BooleanObjectParser.fromJson(o));
      });
      return new Or(operation);
    },
    //Comparators
    [BooleanObjectType.GT]: (json: any) =>
      new GreaterThan(
        NumberObjectParser.fromJson(json.left),
        NumberObjectParser.fromJson(json.right)
      ),
    [BooleanObjectType.GE]: (json: any) =>
      new GreaterEqual(
        NumberObjectParser.fromJson(json.left),
        NumberObjectParser.fromJson(json.right)
      ),
    [BooleanObjectType.LT]: (json: any) =>
      new LessThan(
        NumberObjectParser.fromJson(json.left),
        NumberObjectParser.fromJson(json.right)
      ),
    [BooleanObjectType.LE]: (json: any) =>
      new LessEqual(
        NumberObjectParser.fromJson(json.left),
        NumberObjectParser.fromJson(json.right)
      ),
    [BooleanObjectType.EQ]: (json: any) => {
      if (json.left.type.startsWith("string") && json.left.type.startsWith("string")) {
        if (
          StringObjectParser.containsParser(json.left.type) &&
          StringObjectParser.containsParser(json.right.type)
        ) {
          return new Equal(
            StringObjectParser.fromJson(json.left),
            StringObjectParser.fromJson(json.right)
          );
        }
      }
      if (
        NumberObjectParser.containsParser(json.left.type) &&
        NumberObjectParser.containsParser(json.right.type)
      ) {
        return new Equal(
          NumberObjectParser.fromJson(json.left),
          NumberObjectParser.fromJson(json.right)
        );
      }
    },
    [BooleanObjectType.NE]: (json: any) => {
      if (
        NumberObjectParser.containsParser(json.left.type) &&
        NumberObjectParser.containsParser(json.right.type)
      ) {
        return new NotEqual(
          NumberObjectParser.fromJson(json.left),
          NumberObjectParser.fromJson(json.right)
        );
      }
    }
  };
  public static fromJson(json: any): BooleanObject {
    return this.parsers[json.type](json);
  }
  public static containsParser(type: string) {
    return type in this.parsers;
  }
}
