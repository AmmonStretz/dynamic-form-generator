import { Form } from "../Form/Form.config";
import { FormParser } from "../Form/Form.parser";
import { Wizzard } from "./Wizzard.config";

export class WizzardParser {
    public static parseFromJSON(json: any): Wizzard {
      return new Wizzard(
        FormParser.parseFromJSONArray(json.forms),
        json.settings
      )
    }
  }