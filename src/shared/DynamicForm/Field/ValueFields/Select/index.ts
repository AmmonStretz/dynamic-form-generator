import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { SelectConfig } from './Select.config';
import SelectFieldComponent from './Select.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(SelectFieldComponent.name, SelectFieldComponent);
    PluginService.valueFields.push(SelectFieldComponent.name)
    PluginService.fieldParser['select'] = (json: any)=> {
      return new SelectConfig(
        json.key,
        json.options,
        json.settings,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanConditionParser.fromJson(json.visible),
      );
    }
   }
}