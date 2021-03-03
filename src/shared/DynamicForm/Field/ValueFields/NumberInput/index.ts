import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanObjectParser } from '@/shared/Math/parsers/boolean.class';
import { NumberInputConfig } from './NumberInput.config';
import NumberInputFieldComponent from './NumberInput.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(NumberInputFieldComponent.name, NumberInputFieldComponent);
    PluginService.valueFields.push(NumberInputFieldComponent.name)
    PluginService.fieldParser['numberInput'] = (json: any)=> {
      return new NumberInputConfig(
        json.key,
        json.settings,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanObjectParser.fromJson(json.visible),
      );
    }
   }
}