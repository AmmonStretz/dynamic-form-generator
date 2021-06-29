import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { Status } from '@/shared/DynamicForm/status';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
import { RadioButtonListConfig } from './RadioButtonList.config';
import RadioButtonListFieldComponent from './RadioButtonList.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<RadioButtonListConfig>(
      RadioButtonListFieldComponent,
      'radioButtonList',
      'valueField',
      { //TODO: multiple radio buttons with loop
        form: new FieldGroupConfig('radio-button-list-form', [
          new TextInputConfig("key", { name: "Key" }, []),
          new TextInputConfig("name", { name: "Name" }, []),
          new TextInputConfig("value", { name: "Value" }, []),
        ], {}), generator: (formStatus: Status) => {
          return new RadioButtonListConfig(
            formStatus.getValueByKey('key'),
            [{name: formStatus.getValueByKey('name'), value: formStatus.getValueByKey('value')}],
            {}
          )
        }, fill: (current: RadioButtonListConfig, form: FieldGroupConfig) => {
          console.log('radioButtonList', current, form);
          return form;
        }
      },
      (json: any) => {
        return new RadioButtonListConfig(
          json.key,
          json.options,
          json.settings,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanConditionParser.fromJson(json.visible),
        );
      }
    ));
   }
}