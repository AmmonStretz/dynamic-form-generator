import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
import ValidationListComponent from './ValidationList.vue';
import { ValidationListConfig } from './ValidationList.config';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<ValidationListConfig>(
      ValidationListComponent,
      'validation-list',
      'valueField',
      {
        form: new FieldGroupConfig('checkbox-form', [
          new TextInputConfig("key", { name: "Key" }, []),
        ], {}),
        generator: null,
        fill: (current: ValidationListConfig, form: FieldGroupConfig) => {
          return form;
        }
      },
      (json: any) => {
        return new ValidationListConfig(
          json.key,
          json.validationType,
          json.settings,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanConditionParser.fromJson(json.visible),
        );
      },
      false
    ));
  }
}