import Vue, { VueConstructor } from "vue";
import { Config } from "../config";
import { FieldConfig } from "../Field/Field.config";
import { FieldGroupConfig, FieldGroupStatus } from "../Field/FieldGroup/FieldGroup.config";
import { PluginService } from "../services/Plugin.service";

export enum FieldType {
  CONTENT = 'contentField',
  VALUE = 'valueField'
}

export class FieldPlugin<C extends FieldConfig> {

  // TODO: replace constr.name with key
  constructor(
    public component: VueConstructor<Vue>,
    public key: string,
    public type: string,
    public editor: { form: FieldGroupConfig, generator: (status: FieldGroupStatus)=>C, fill?: (current: C, form: FieldGroupConfig) => FieldGroupConfig},
    public parser: (json: any) => C
  ) {
    Vue.component(component.name, component);
    PluginService.fieldParser[key] = this.parser;
  }
}