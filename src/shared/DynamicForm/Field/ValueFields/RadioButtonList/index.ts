import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { RadioButtonListConfig } from './RadioButtonList.config';
import RadioButtonListFieldComponent from './RadioButtonList.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(RadioButtonListFieldComponent.name, RadioButtonListFieldComponent);
    PluginService.valueFields.push(RadioButtonListFieldComponent.name)
    PluginService.fieldParser['radioButtonList'] = (json: any)=> {
      return new RadioButtonListConfig(
        json.key,
        json.options,
        json.settings,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanConditionParser.fromJson(json.visible),
      );
    }
   }
}