import { FieldParser } from "../Field/Field.parser";
import { BooleanObjectParser } from "@/shared/Math/parsers/boolean.class";
import { FormConfig } from "./Form.config";

export class FormParser {
  public static parseFromJSONArray(jsonArray: any[]): FormConfig[] {
    let result: FormConfig[] = [];
    jsonArray.forEach(json => {
      result.push(this.parseFromJSON(json));
    });
    return result;
  }
  public static parseFromJSON(json: any): FormConfig {
    if (!json.visible) json.visible = { type: "boolean-const", value: true };
    return new FormConfig(
      json.key,
      FieldParser.parseFromJSONArray(json.fields),
      json.settings,
      BooleanObjectParser.fromJson(json.visible)
    );
  }
}