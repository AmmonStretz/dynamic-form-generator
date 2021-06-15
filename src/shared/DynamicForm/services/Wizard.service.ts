import { WizardConfig } from "../Wizard/Wizard.config";

import { config } from "../../data/wizard.config";
import { WizardParser } from "../Wizard/Wizard.parser";
export default abstract class WizardService {
  public static wizards: { [key: string]: WizardConfig } = {};
  public static loadWizards(key: string): WizardConfig {
    if(!('afq' in this.wizards)){
      this.wizards.afq = WizardParser.parseFromJSON(config);
    }
    return this.wizards[key]
  }
}