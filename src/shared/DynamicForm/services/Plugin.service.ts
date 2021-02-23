import { Field } from "../Field/Field.dto";

export class PluginService {
  public static valueFields: any[] = [];
  public static contentFields: any[] = [];
  public static fieldParser: {[key: string]: (json: any)=>Field} = {};
}