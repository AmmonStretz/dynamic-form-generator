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
    [BooleanObjectType.VAR]: (json: any) => new BooleanVar(json.name),
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
        NumberObjectParser.fromJson(json.first),
        NumberObjectParser.fromJson(json.second)
      ),
    [BooleanObjectType.GE]: (json: any) =>
      new GreaterEqual(
        NumberObjectParser.fromJson(json.first),
        NumberObjectParser.fromJson(json.second)
      ),
    [BooleanObjectType.LT]: (json: any) =>
      new LessThan(
        NumberObjectParser.fromJson(json.first),
        NumberObjectParser.fromJson(json.second)
      ),
    [BooleanObjectType.LE]: (json: any) =>
      new LessEqual(
        NumberObjectParser.fromJson(json.first),
        NumberObjectParser.fromJson(json.second)
      ),
    [BooleanObjectType.EQ]: (json: any) => {
      if (json.first.type.startsWith("string") && json.first.type.startsWith("string")) {
        if (
          StringObjectParser.containsParser(json.first.type) &&
          StringObjectParser.containsParser(json.second.type)
        ) {
          return new Equal(
            StringObjectParser.fromJson(json.first),
            StringObjectParser.fromJson(json.second)
          );
        }
      }
      if (
        NumberObjectParser.containsParser(json.first.type) &&
        NumberObjectParser.containsParser(json.second.type)
      ) {
        return new Equal(
          NumberObjectParser.fromJson(json.first),
          NumberObjectParser.fromJson(json.second)
        );
      }
    },
    [BooleanObjectType.NE]: (json: any) => {
      if (
        NumberObjectParser.containsParser(json.first.type) &&
        NumberObjectParser.containsParser(json.second.type)
      ) {
        return new NotEqual(
          NumberObjectParser.fromJson(json.first),
          NumberObjectParser.fromJson(json.second)
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
