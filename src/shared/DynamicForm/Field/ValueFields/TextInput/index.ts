import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { TextInputConfig } from './TextInput.config';
import TextInputFieldComponent from './TextInput.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(TextInputFieldComponent.name, TextInputFieldComponent);
    PluginService.valueFields.push(TextInputFieldComponent.name)
    PluginService.fieldParser['textInput'] = (json: any)=> {
      return new TextInputConfig(
        json.key,
        json.settings,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanConditionParser.fromJson(json.visible),
      );
    }
   }
}