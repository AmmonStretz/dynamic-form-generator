import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanObjectParser } from '@/shared/Math/parsers/boolean.class';
import { TextArea } from './TextArea.dto';
import TextAreaFieldComponent from './TextArea.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(TextAreaFieldComponent.name, TextAreaFieldComponent);
    PluginService.valueFields.push(TextAreaFieldComponent.name)
    PluginService.fieldParser['textArea'] = (json: any)=> {
      return new TextArea(
        json.key,
        json.config,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanObjectParser.fromJson(json.visible),
      );
    }
   }
}