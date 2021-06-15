import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { CheckboxConfig } from './Checkbox.config';
import CheckboxFieldComponent from './Checkbox.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(CheckboxFieldComponent.name, CheckboxFieldComponent);
    PluginService.valueFields.push(CheckboxFieldComponent.name)
    PluginService.fieldParser['checkbox'] = (json: any)=> {
      return new CheckboxConfig(
        json.key,
        json.settings,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanConditionParser.fromJson(json.visible),
      );
    }
   }
}