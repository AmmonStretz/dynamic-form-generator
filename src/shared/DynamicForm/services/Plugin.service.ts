import { FieldConfig } from "../Field/Field.config";

export class PluginService {
  public static valueFields: any[] = [];
  public static contentFields: any[] = [];
  public static fieldParser: {[key: string]: (json: any)=>FieldConfig} = {};
}