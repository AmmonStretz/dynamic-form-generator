import { config } from "../../data/wizard.config";
import { FinderConfig } from "../Finder/Finder.config";
import { FinderParser } from "../Finder/Finder.parser";
export default abstract class WizardService {
  // public static finders: { [key: string]: FinderConfig } = {};
  public static finder: FinderConfig = FinderParser.parseFromJSON(config);
  //public static loadFinders(key: string): FinderConfig {
  //  if(!('default' in this.finders)){
  //    this.finders.default = FinderParser.parseFromJSON(config);
  //  }
  //  return this.finders[key]
  //}
}