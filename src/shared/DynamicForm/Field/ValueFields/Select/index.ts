import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { Status } from '@/shared/DynamicForm/status';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
import { SelectConfig } from './Select.config';
import SelectFieldComponent from './Select.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<SelectConfig>(
      SelectFieldComponent,
      'select',
      'valueField',
      { //TODO: multiple options with loop
        form: new FieldGroupConfig('select-form', [
          new TextInputConfig("key", { name: "Key" }, []),
          new TextInputConfig("name", { name: "Name" }, []),
          new TextInputConfig("value", { name: "Value" }, []),
        ], {}), generator: (formStatus: Status) => {
          return new SelectConfig(
            formStatus.getValueByKey('key'),
            [{name: formStatus.getValueByKey('name'), value: formStatus.getValueByKey('value')}],
            {}
          )
        }, fill: (current: SelectConfig, form: FieldGroupConfig) => {
          console.log('select', current, form);
          return form;
        }
      },
      (json: any) => {
        return new SelectConfig(
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