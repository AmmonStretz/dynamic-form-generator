import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanObjectParser } from '@/shared/Math/parsers/boolean.class';
import { Select } from './Select.dto';
import SelectFieldComponent from './Select.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(SelectFieldComponent.name, SelectFieldComponent);
    Vue.valueFields.push(SelectFieldComponent.name)
    Vue.fieldParser['select'] = (json: any)=> {
      return new Select(
        json.key,
        json.options,
        json.config,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanObjectParser.fromJson(json.visible),
      );
    }
   }
}