import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
import LogicInputComponent from './LogicInput.vue';
import { LogicInputConfig } from './LogicInput.config';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { Required } from '@/shared/DynamicForm/Validators';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<LogicInputConfig>(
      LogicInputComponent,
      'logic-input',
      'valueField',
      {
        form: new FieldGroupConfig('logic-inoput-form', [
          new TextInputConfig("key", { name: "Schlüssel" }, [new Required('Dieses Feld ist notwendig')]),
        ], {}),
        generator: null,
        fill: (current: LogicInputConfig, form: FieldGroupConfig) => {
          return form;
        }
      },
      (json: any) => {
        return new LogicInputConfig(
          json.key,
          json.options,
          json.settings,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanConditionParser.fromJson(json.visible),
        );
      },
      false
    ));
  }
}