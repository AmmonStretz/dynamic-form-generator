import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { TextAreaConfig } from './TextArea.config';
import TextAreaFieldComponent from './TextArea.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(TextAreaFieldComponent.name, TextAreaFieldComponent);
    PluginService.valueFields.push(TextAreaFieldComponent.name)
    PluginService.fieldParser['textArea'] = (json: any)=> {
      return new TextAreaConfig(
        json.key,
        json.settings,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanConditionParser.fromJson(json.visible),
      );
    }
   }
}