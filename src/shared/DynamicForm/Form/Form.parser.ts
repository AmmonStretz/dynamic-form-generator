import { FieldParser } from "../Field/Field.parser";
import { BooleanObjectParser } from "@/shared/Math/parsers/boolean.class";
import { Form } from "./Form.config";

export class FormParser {
  public static parseFromJSONArray(jsonArray: any[]): Form[] {
    let result: Form[] = [];
    jsonArray.forEach(json => {
      result.push(this.parseFromJSON(json));
    });
    return result;
  }
  public static parseFromJSON(json: any): Form {
    if (!json.visible) json.visible = { type: "boolean-const", value: true };
    return new Form(
      json.key,
      FieldParser.parseFromJSONArray(json.fields),
      json.settings,
      BooleanObjectParser.fromJson(json.visible)
    );
  }
}