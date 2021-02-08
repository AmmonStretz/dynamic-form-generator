import { BooleanObjectParser } from "@/shared/Math/parsers/boolean.class";
import { ValidatorParser } from "../Validators";
import { Checkbox } from "./ValueFields/Checkbox/Checkbox.dto";
import { Field, FieldTypes } from "./Field.dto";
import { FieldGroup } from "./FieldGroup/FieldGroup.dto";
import { NumberInput } from "./ValueFields/NumberInput/NumberInput.dto";
import { TextInput } from "./ValueFields/TextInput/TextInput.dto";
import { NumberRange } from "./ValueFields/NumberRange/NumberRange.dto";
import { Select } from "./ValueFields/Select/Select.dto";
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
}

export class FieldParser {
  public static parseFromJSONArray(jsonArray: jsonStructure[]): Field[] {
    let result: Field[] = [];
    jsonArray.forEach(json => {
      result.push(this.parseFromJSON(json));
    });
    return result;
  }
  public static parseFromJSON(json: jsonStructure): Field {
    if (!json.visible) json.visible = { type: "boolean-const", value: true };
    switch (json.type) {
      case FieldTypes.CHECKBOX:
        return new Checkbox(
          json.key,
          json.config,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanObjectParser.fromJson(json.visible),
        );
      case FieldTypes.NUMBER_INPUT:
        return new NumberInput(
          json.key,
          json.config,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanObjectParser.fromJson(json.visible),
        );
      case FieldTypes.FIELD_LOOP:
        
        return new FieldLoop(
          json.key,
          this.parseFromJSON(json.field),
          json.config,
          BooleanObjectParser.fromJson(json.visible),
          NumberObjectParser.fromJson(json.condition)
        );
      case FieldTypes.TEXT_INPUT:
        return new TextInput(
          json.key,
          json.config,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanObjectParser.fromJson(json.visible),
        );
      case FieldTypes.NUMBER_RANGE:
        // validate config
        return new NumberRange(
          json.key,
          json.config,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanObjectParser.fromJson(json.visible),
        );
      case FieldTypes.FIELD_GROUP:
        // validate config
        return new FieldGroup(
          json.key,
          this.parseFromJSONArray(json.fields),
          json.config,
          BooleanObjectParser.fromJson(json.visible),
        );

      case FieldTypes.SELECT:
        return new Select(
          json.key,
          json.options,
          json.config,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanObjectParser.fromJson(json.visible),
        );
      // return new MaxNumber(json.message, json.value);
    }
    return null;
  }
}