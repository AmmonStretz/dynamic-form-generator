import { BooleanConditionParser } from "@/shared/ts-condition-parser/parsers/boolean.class";
import { FieldParser } from "../Field/Field.parser";
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
      BooleanConditionParser.fromJson(json.visible)
    );
  }
}