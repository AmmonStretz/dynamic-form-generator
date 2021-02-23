import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanObjectParser } from '@/shared/Math/parsers/boolean.class';
import { NumberRange } from './NumberRange.dto';
import NumberRangeFieldComponent from './NumberRange.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(NumberRangeFieldComponent.name, NumberRangeFieldComponent);
    Vue.valueFields.push(NumberRangeFieldComponent.name)
    Vue.fieldParser['numberRange'] = (json: any)=> {
      return new NumberRange(
        json.key,
        json.config,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanObjectParser.fromJson(json.visible),
      );
    }
   }
}