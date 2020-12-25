import { Form } from "../Form/Form.dto";
import { FormParser } from "../Form/Form.parser";
import { Wizzard } from "./Wizzard.dto";

export class WizzardParser {
    public static parseFromJSON(json: any): Wizzard {
      return new Wizzard(
        FormParser.parseFromJSONArray(json.forms),
        json.config
      )
    }
  }