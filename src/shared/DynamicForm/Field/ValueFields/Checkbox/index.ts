import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { Status } from '@/shared/DynamicForm/status';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
import { CheckboxConfig } from './Checkbox.config';
import Checkbox from './Checkbox.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<CheckboxConfig>(
      Checkbox,
      'checkbox',
      'valueField',
      { //TODO: multiple links
        form: new FieldGroupConfig('checkbox-form', [
          new TextInputConfig("key", { name: "Key" }, []),
        ], {}), generator: (formStatus: Status) => {
          return new CheckboxConfig(
            formStatus.getValueByKey('key'),
            {}
          )
        }, fill: (current: CheckboxConfig, form: FieldGroupConfig) => {
          console.log('checkbox', current, form);
          return form;
        }
      },
      (json: any) => {
        return new CheckboxConfig(
          json.key,
          json.settings,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanConditionParser.fromJson(json.visible),
        );
      }
    ));
  }
}