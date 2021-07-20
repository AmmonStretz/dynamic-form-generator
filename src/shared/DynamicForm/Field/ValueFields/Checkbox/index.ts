import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { Status } from '@/shared/DynamicForm/status';
import { Required } from '@/shared/DynamicForm/Validators';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextAreaConfig } from '../TextArea/TextArea.config';
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
          new TextInputConfig("key", { name: "Schlüssel" }, [new Required('Dieses Feld ist notwendig')]),
          new TextInputConfig("name", { name: "Name" }, []),
          new TextAreaConfig("description", { name: "Beschreibung" }, []),
          new CheckboxConfig("default", { name: "Default" }, []),
        ], {}), generator: (formStatus: Status) => {
          return new CheckboxConfig(
            formStatus.getValueByKey('key'),
            {
              name: formStatus.getValueByKey('name'),
              description: formStatus.getValueByKey('description'),
              default: formStatus.getValueByKey('default'),
            }
          )
        }, fill: (current: CheckboxConfig, form: FieldGroupConfig) => {
          
          let key: TextInputConfig = (form.fields[0] as TextInputConfig);
          key.settings.default = current.key;

          let name: TextInputConfig = (form.fields[1] as TextInputConfig);
          name.settings.default = current.settings.name;

          let description: TextAreaConfig = (form.fields[2] as TextAreaConfig);
          description.settings.default = current.settings.description;

          let defaultValue: CheckboxConfig = (form.fields[3] as CheckboxConfig);
          defaultValue.settings.default = current.settings.default;

          form.fields = [];
          form.fields.push(key);
          form.fields.push(name);
          form.fields.push(description);
          form.fields.push(defaultValue);
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