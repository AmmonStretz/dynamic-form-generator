import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../../FieldGroup/FieldGroup.config';
import { TextInputConfig } from '../../TextInput/TextInput.config';
import BooleanLogicInputComponent from './BooleanLogicInput.vue';
import { BooleanLogicInputConfig } from './BooleanLogicInput.config';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { Required } from '@/shared/DynamicForm/Validators';

export default {
  install: (Vue: any, options: any) => {
    console.log(312);
    
    (Vue as any).fieldPlugins.push(new FieldPlugin<BooleanLogicInputConfig>(
      BooleanLogicInputComponent,
      'boolean-logic-input',
      'valueField',
      {
        form: ()=> new FieldGroupConfig('boolean-logic-input-form', [
          new TextInputConfig("key", { name: "Schlüssel" }, [new Required('Dieses Feld ist notwendig')]),
        ], {}),
        generator: null,
        fill: (current: BooleanLogicInputConfig, form: FieldGroupConfig) => {
          return form;
        }
      },
      (json: any) => {
        return new BooleanLogicInputConfig(
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