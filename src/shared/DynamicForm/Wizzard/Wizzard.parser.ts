import { FormConfig } from "../Form/Form.config";
import { FormParser } from "../Form/Form.parser";
import { WizzardConfig } from "./Wizzard.config";

export class WizzardParser {
    public static parseFromJSON(json: any): WizzardConfig {
      return new WizzardConfig(
        FormParser.parseFromJSONArray(json.forms),
        json.settings
      )
    }
  }