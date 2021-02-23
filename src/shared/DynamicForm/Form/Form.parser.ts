import { FieldParser } from "../Field/Field.parser";
import { BooleanObjectParser } from "@/shared/Math/parsers/boolean.class";
import { Form } from "./Form.dto";

export class FormParser {
  public static parseFromJSONArray(fieldParser: any, jsonArray: any[]): Form[] {
    let result: Form[] = [];
    jsonArray.forEach(json => {
      result.push(this.parseFromJSON(fieldParser, json));
    });
    return result;
  }
  public static parseFromJSON(fieldParser: any, json: any): Form {
    if (!json.visible) json.visible = { type: "boolean-const", value: true };
    return new Form(
      json.key,
      FieldParser.parseFromJSONArray(fieldParser, json.fields),
      json.config,
      BooleanObjectParser.fromJson(json.visible)
    );
  }
}