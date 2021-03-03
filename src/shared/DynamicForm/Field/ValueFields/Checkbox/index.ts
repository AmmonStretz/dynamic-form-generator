import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanObjectParser } from '@/shared/Math/parsers/boolean.class';
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
        BooleanObjectParser.fromJson(json.visible),
      );
    }
   }
}