import { Validator } from './validators.class';
import { PluginService } from '../services/Plugin.service';

export class ValidatorParser {
  public static parseFromJSONArray(jsonArray: {
    type: string,
    message: string,
    value?: any
  }[]): Validator<any>[] {
    let result: Validator<any>[] = [];
    jsonArray.forEach(json => {
      result.push(this.parseFromJSON(json));
    });
    return result;
  }
  public static parseFromJSON(json: {
    type: string,
    message: string,
    value?: any
  }): Validator<any> {
    if(json.type in PluginService.validators){
      if(json.value != undefined && json.value != null){
        return PluginService.validators[json.type].parser(json.message, json.value)
      } else {
        return PluginService.validators[json.type].parser(json.message)
      }
    }
    return null;
  }
}