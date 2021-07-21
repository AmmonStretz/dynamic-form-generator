import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { Status } from '@/shared/DynamicForm/status';
import { Required } from '@/shared/DynamicForm/Validators';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { NumberInputConfig } from '../NumberInput/NumberInput.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
import { RadioButtonListConfig } from './RadioButtonList.config';
import RadioButtonList from './RadioButtonList.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<RadioButtonListConfig>(
      RadioButtonList,
      'radioButtonList',
      'valueField',
      { //TODO: multiple radio buttons with loop
        form: ()=> new FieldGroupConfig('radio-button-list-form', [
          new TextInputConfig("key", { name: "Schlüssel" }, [new Required('Dieses Feld ist notwendig')]),
          new TextInputConfig("name", { name: "Name" }, []),
          new TextInputConfig("optionName", { name: "OptionName" }, []),
          new TextInputConfig("optionValue", { name: "OptionValue" }, []),
        ], {}), generator: (formStatus: Status) => {
          return new RadioButtonListConfig(
            formStatus.getValueByKey('key'),
            [{name: formStatus.getValueByKey('optionName'), value: formStatus.getValueByKey('optionValue')}],
            {
              name: formStatus.getValueByKey('name')
            }
          )
        }, fill: (current: RadioButtonListConfig, form: FieldGroupConfig) => {
          let key: TextInputConfig = (form.fields[0] as TextInputConfig);
          key.settings.default = current.key;

          let name: TextInputConfig = (form.fields[1] as TextInputConfig);
          name.settings.default = current.settings.name;

          let optionName: TextInputConfig = (form.fields[2] as TextInputConfig);
          optionName.settings.default = current.options[0].name;

          let value: NumberInputConfig = (form.fields[3] as NumberInputConfig);
          value.settings.default = current.options[0].value;

          form.fields = [];
          form.fields.push(key);
          form.fields.push(name);
          form.fields.push(optionName);
          form.fields.push(value);

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