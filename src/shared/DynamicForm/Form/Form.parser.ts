import { FieldParser } from "../Field/Field.parser";
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
    return new Form(
        FieldParser.parseFromJSONArray(json.fields),
        json.config
    );
  }
}