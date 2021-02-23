import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanObjectParser } from '@/shared/Math/parsers/boolean.class';
import { TextInput } from './TextInput.dto';
import TextInputFieldComponent from './TextInput.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(TextInputFieldComponent.name, TextInputFieldComponent);
    PluginService.valueFields.push(TextInputFieldComponent.name)
    PluginService.fieldParser['textInput'] = (json: any)=> {
      return new TextInput(
        json.key,
        json.config,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanObjectParser.fromJson(json.visible),
      );
    }
   }
}