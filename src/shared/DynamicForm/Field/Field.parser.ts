import { BooleanObjectParser } from "@/shared/Math/parsers/boolean.class";
import { Field } from "./Field.dto";
import { FieldGroup } from "./FieldGroup/FieldGroup.dto";
import { FieldLoop } from "./FieldLoop/FieldLoop.dto";
import { NumberObjectParser } from "@/shared/Math/parsers/number.class";

export interface jsonStructure {
  type: string;
  fields?: any[];
  field?: any;
  options?: { name: string, value: number }[];
  key: string;
  config: any;
  validators: any[];
  visible: any;
  condition?: any;
  text?: string;
  links: { text: string, url: string }[];
}

export class FieldParser {
  public static parseFromJSONArray(fieldParser: any, jsonArray: jsonStructure[]): Field[] {
    let result: Field[] = [];
    jsonArray.forEach(json => {
      result.push(this.parseFromJSON(fieldParser, json));
    });
    return result;
  }
  public static parseFromJSON(fieldParser: any, json: jsonStructure): Field {
    if (!json.visible) json.visible = { type: "boolean-const", value: true };
    if (!json.condition) json.condition = { type: "number-const", value: 0 };
    if(json.type in fieldParser){
      return fieldParser[json.type](json);
    }
    switch (json.type) {
      case 'fieldLoop':
        return new FieldLoop(
          json.key,
          this.parseFromJSON(fieldParser, json.field),
          json.config,
          BooleanObjectParser.fromJson(json.visible),
          NumberObjectParser.fromJson(json.condition)
        );
      case 'fieldGroup':
        // validate config
        return new FieldGroup(
          json.key,
          this.parseFromJSONArray(fieldParser, json.fields),
          json.config,
          BooleanObjectParser.fromJson(json.visible),
        );
    }
    return null;
  }
}