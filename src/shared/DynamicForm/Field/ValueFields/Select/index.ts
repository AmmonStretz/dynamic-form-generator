import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanObjectParser } from '@/shared/Math/parsers/boolean.class';
import { Select } from './Select.config';
import SelectFieldComponent from './Select.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(SelectFieldComponent.name, SelectFieldComponent);
    PluginService.valueFields.push(SelectFieldComponent.name)
    PluginService.fieldParser['select'] = (json: any)=> {
      return new Select(
        json.key,
        json.options,
        json.settings,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanObjectParser.fromJson(json.visible),
      );
    }
   }
}