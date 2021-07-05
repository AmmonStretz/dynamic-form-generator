import { PluginService } from "../services/Plugin.service";
import { Validator } from "../Validators/validators.class";


export class ValidatorPlugin {
  constructor(
    public type: string, // number, string, any
    public name: string, // required
    public parser: (message: string, value?: any) => Validator<any>,
    public defaultMessage: string = null,
    public defaultValue: any = null,
  ) {
        PluginService.validators[name] = this;
    
  }
}