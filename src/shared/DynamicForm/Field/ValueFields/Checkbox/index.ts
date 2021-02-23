import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanObjectParser } from '@/shared/Math/parsers/boolean.class';
import { Checkbox } from './Checkbox.dto';
import CheckboxFieldComponent from './Checkbox.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(CheckboxFieldComponent.name, CheckboxFieldComponent);
    Vue.valueFields.push(CheckboxFieldComponent.name)
    Vue.fieldParser['checkbox'] = (json: any)=> {
      return new Checkbox(
        json.key,
        json.config,
        ValidatorParser.parseFromJSONArray(json.validators),
        BooleanObjectParser.fromJson(json.visible),
      );
    }
   }
}