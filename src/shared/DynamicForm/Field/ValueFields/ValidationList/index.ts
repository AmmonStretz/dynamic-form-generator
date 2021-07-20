import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
import ValidationList from './ValidationList.vue';
import { ValidationListConfig } from './ValidationList.config';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { Required } from '@/shared/DynamicForm/Validators';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<ValidationListConfig>(
      ValidationList,
      'validation-list',
      'valueField',
      {
        form: new FieldGroupConfig('checkbox-form', [
          new TextInputConfig("key", { name: "Schlüssel" }, [new Required('Dieses Feld ist notwendig')]),
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