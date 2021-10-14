import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../../FieldGroup/FieldGroup.config';
import { TextInputConfig } from '../../TextInput/TextInput.config';
import NumberLogicInputComponent from './NumberLogicInput.vue';
import { NumberLogicInputConfig } from './NumberLogicInput.config';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { Required } from '@/shared/DynamicForm/Validators';
console.log(1111);

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<NumberLogicInputConfig>(
      NumberLogicInputComponent,
      'number-logic-input',
      'valueField',
      {
        form: ()=> new FieldGroupConfig('number-logic-input-form', [
          new TextInputConfig("key", { name: "Schlüssel" }, [new Required('Dieses Feld ist notwendig')]),
        ], {}),
        generator: null,
        fill: (current: NumberLogicInputConfig, form: FieldGroupConfig) => {
          return form;
        }
      },
      (json: any) => {
        return new NumberLogicInputConfig(
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