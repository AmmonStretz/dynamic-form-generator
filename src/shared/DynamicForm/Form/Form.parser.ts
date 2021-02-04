import { FieldParser } from "../Field/Field.parser";
import { BooleanObjectParser } from "../math-logic/parsers/boolean.class";
import { Form } from "./Form.dto";

export class FormParser {
  public static parseFromJSONArray(jsonArray: any[]): Form[] {
    let result: Form[] = [];
    jsonArray.forEach(json => {
      result.push(this.parseFromJSON(json));
    });
    return result;
  }
  public static parseFromJSON(json: any): Form {
    if(!json.visible) json.visible = {type: "boolean-const", value: true};
    return new Form(
        FieldParser.parseFromJSONArray(json.fields),
        json.config,
        BooleanObjectParser.fromJson(json.visible)
    );
  }
}