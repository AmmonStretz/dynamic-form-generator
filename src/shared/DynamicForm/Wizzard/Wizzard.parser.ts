import { Form } from "../Form/Form.dto";
import { FormParser } from "../Form/Form.parser";
import { Wizzard } from "./Wizzard.dto";

export class WizzardParser {
    public static parseFromJSON(fieldParser: any, json: any): Wizzard {
      return new Wizzard(
        FormParser.parseFromJSONArray(fieldParser, json.forms),
        json.config
      )
    }
  }