import { BooleanObjectParser } from "@/shared/Math/parsers/boolean.class";
import { FieldConfig } from "./Field.config";
import { FieldGroupConfig } from "./FieldGroup/FieldGroup.config";
import { FieldLoopConfig } from "./FieldLoop/FieldLoop.config";
import { NumberObjectParser } from "@/shared/Math/parsers/number.class";
import { PluginService } from "../services/Plugin.service";

export interface jsonStructure {
  type: string;
  fields?: any[];
  field?: any;
  options?: { name: string, value: number }[];
  key: string;
  settings: any;
  validators: any[];
  visible: any;
  condition?: any;
  text?: string;
  links: { text: string, url: string }[];
}

export class FieldParser {
  public static parseFromJSONArray(jsonArray: jsonStructure[]): FieldConfig[] {
    let result: FieldConfig[] = [];
    jsonArray.forEach(json => {
      result.push(this.parseFromJSON(json));
    });
    return result;
  }
  public static parseFromJSON(json: jsonStructure): FieldConfig {
    if (!json.visible) json.visible = { type: "boolean-const", value: true };
    if (!json.condition) json.condition = { type: "number-const", value: 0 };
    if(json.type in PluginService.fieldParser){
      return PluginService.fieldParser[json.type](json);
    }
    switch (json.type) {
      case 'fieldLoop':
        return new FieldLoopConfig(
          json.key,
          this.parseFromJSON(json.field),
          json.settings,
          BooleanObjectParser.fromJson(json.visible),
          NumberObjectParser.fromJson(json.condition)
        );
      case 'fieldGroup':
        // validate settings
        return new FieldGroupConfig(
          json.key,
          this.parseFromJSONArray(json.fields),
          json.settings,
          BooleanObjectParser.fromJson(json.visible),
        );
    }
    return null;
  }
}