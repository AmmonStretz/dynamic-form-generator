import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { Status } from '@/shared/DynamicForm/status';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextInputConfig } from './TextInput.config';
import TextInputFieldComponent from './TextInput.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<TextInputConfig>(
      TextInputFieldComponent,
      'textInput',
      'valueField',
      { //TODO: multiple links
        form: new FieldGroupConfig('text-input-form', [
          new TextInputConfig("key", { name: "Key" }, []),
        ], {}), generator: (formStatus: Status) => {
          return new TextInputConfig(
            formStatus.getValueByKey('key'),
            {}
          )
        }, fill: (current: TextInputConfig, form: FieldGroupConfig) => {
          console.log('textInput', current, form);
          return form;
        }
      },
      (json: any) => {
        return new TextInputConfig(
          json.key,
          json.settings,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanConditionParser.fromJson(json.visible),
        );
      }
    ));
   }
}