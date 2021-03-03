import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanObjectParser } from '@/shared/Math/parsers/boolean.class';
import { NumberRangeConfig } from './NumberRange.config';
import NumberRangeFieldComponent from './NumberRange.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(NumberRangeFieldComponent.name, NumberRangeFieldComponent);
    PluginService.valueFields.push(NumberRangeFieldComponent.name)
    PluginService.fieldParser['numberRange'] = (json: any)=> {
      return new NumberRangeConfig(
        json.key,
        json.settings,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanObjectParser.fromJson(json.visible),
      );
    }
   }
}