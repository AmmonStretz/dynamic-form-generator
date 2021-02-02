import { BooleanObject } from '../math-object.class';
import { BooleanVar,
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
import { BooleanObjectKey } from '../math-naming.class';
import { NumberObjectParser } from './number.class';
import { StringObjectParser } from './string.class';

export abstract class BooleanObjectParser {
  public static parsers: any = {
    [BooleanObjectKey.VAR]: (json: any) => new BooleanVar(json.name),
    [BooleanObjectKey.CONST]: (json: any) => new BooleanConst(json.value),
    [BooleanObjectKey.NOT]: (json: any) =>
      new Not(BooleanObjectParser.fromJson(json.operator)),
    [BooleanObjectKey.AND]: (json: any) => {
      let operation: BooleanObject[] = [];
      json.operation.forEach((o: any) => {
        operation.push(BooleanObjectParser.fromJson(o));
      });
      return new And(operation);
    },
    [BooleanObjectKey.OR]: (json: any) => {
      let operation: BooleanObject[] = [];
      json.operation.forEach((o: any) => {
        operation.push(BooleanObjectParser.fromJson(o));
      });
      return new Or(operation);
    },
    //Comparators
    [BooleanObjectKey.GT]: (json: any) =>
      new GreaterThan(
        NumberObjectParser.fromJson(json.first),
        NumberObjectParser.fromJson(json.second)
      ),
    [BooleanObjectKey.GE]: (json: any) =>
      new GreaterEqual(
        NumberObjectParser.fromJson(json.first),
        NumberObjectParser.fromJson(json.second)
      ),
    [BooleanObjectKey.LT]: (json: any) =>
      new LessThan(
        NumberObjectParser.fromJson(json.first),
        NumberObjectParser.fromJson(json.second)
      ),
    [BooleanObjectKey.LE]: (json: any) =>
      new LessEqual(
        NumberObjectParser.fromJson(json.first),
        NumberObjectParser.fromJson(json.second)
      ),
    [BooleanObjectKey.EQ]: (json: any) => {
      if (
        StringObjectParser.containsParser(json.first.key) &&
        StringObjectParser.containsParser(json.second.key)
      ) {
        return new Equal(
          StringObjectParser.fromJson(json.first),
          StringObjectParser.fromJson(json.second)
        );
      } else if (
        NumberObjectParser.containsParser(json.first.key) &&
        NumberObjectParser.containsParser(json.second.key)
      ) {
        return new NotEqual(
          NumberObjectParser.fromJson(json.first),
          NumberObjectParser.fromJson(json.second)
        );
      }
    },
    [BooleanObjectKey.NE]: (json: any) => { }
  };
  public static fromJson(json: any): BooleanObject {
    return this.parsers[json.key](json);
  }
  public static containsParser(key: string) {
    return key in this.parsers;
  }
}
