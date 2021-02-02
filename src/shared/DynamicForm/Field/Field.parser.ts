import { ValidatorParser } from "../Validators";
import { Checkbox } from "./Checkbox/Checkbox.dto";
import { Field, FieldTypes } from "./Field.dto";
import { FieldGroup } from "./FieldGroup/FieldGroup.dto";
import { NumberInput } from "./NumberInput/NumberInput.dto";
import { NumberRange } from "./NumberRange/NumberRange.dto";
import { Select } from "./Select/Select.dto";
import { TextField } from "./TextField/TextField.dto";

export class FieldParser {
  public static parseFromJSONArray(jsonArray: { type: string, fields?: any[], options?: {name: string, value: number}[], key: string, config: any, validators: any[], visible: any }[]): Field[] {
    let result: Field[] = [];
    jsonArray.forEach(json => {
      result.push(this.parseFromJSON(json));
    });
    return result;
  }
  public static parseFromJSON(json: { type: string, fields?: any[], options?: {name: string, value: number}[], key: string, config: any, validators: any[], visible: any }): Field {
    switch (json.type) {
      case FieldTypes.CHECKBOX:
        return new Checkbox(
          json.key,
          json.config,
          ValidatorParser.parseFromJSONArray(json.validators),
          json.visible,
        );
      case FieldTypes.NUMBER_INPUT:
        return new NumberInput(
          json.key,
          json.config,
          ValidatorParser.parseFromJSONArray(json.validators),
          json.visible,
        );
      case FieldTypes.NUMBER_RANGE:
        // validate config
        return new NumberRange(
          json.key,
          json.config,
          ValidatorParser.parseFromJSONArray(json.validators),
          json.visible,
        );
      case FieldTypes.TEXT_FIELD:
        return new TextField(
          json.key,
          json.visible,
        );

      case FieldTypes.FIELD_GROUP:
        // validate config
        return new FieldGroup(
          json.key,
          this.parseFromJSONArray(json.fields),
          json.config,
          ValidatorParser.parseFromJSONArray(json.validators),
          json.visible,
        );
        
      case FieldTypes.SELECT:
        return new Select(
          json.key,
          json.options,
          json.config,
          ValidatorParser.parseFromJSONArray(json.validators),
          json.visible,
        );
      // return new MaxNumber(json.message, json.value);
    }
    return null;
  }
}