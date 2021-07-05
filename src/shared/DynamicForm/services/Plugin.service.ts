import { FieldConfig } from "../Field/Field.config";
import { ValidatorPlugin } from "../Plugin/ValidatorPlugin";

export class PluginService {
  public static valueFields: any[] = [];
  public static contentFields: any[] = [];
  public static fieldParser: {[key: string]: (json: any)=>FieldConfig} = {};

  //Validators
  public static validators: {[key: string]: ValidatorPlugin} = {};
}