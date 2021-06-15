import { FormConfig } from "../Form/Form.config";
import { FormParser } from "../Form/Form.parser";
import { WizardConfig } from "./Wizard.config";

export class WizardParser {
    public static parseFromJSON(json: any): WizardConfig {
      return new WizardConfig(
        FormParser.parseFromJSONArray(json.forms),
        json.settings
      )
    }
  }