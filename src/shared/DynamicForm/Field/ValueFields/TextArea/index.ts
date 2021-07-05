import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { Status } from '@/shared/DynamicForm/status';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { NumberInputConfig } from '../NumberInput/NumberInput.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
import { ValidationListConfig } from '../ValidationList/ValidationList.config';
import { TextAreaConfig } from './TextArea.config';
import TextAreaFieldComponent from './TextArea.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<TextAreaConfig>(
      TextAreaFieldComponent,
      'textArea',
      'valueField',
      { //TODO: multiple links
        form: new FieldGroupConfig('text-area-form', [
          new TextInputConfig("key", { name: "Key" }, []),
          new TextInputConfig("name", { name: "Name" }, []),
          new TextInputConfig("placeholder", { name: "Platzhalter" }, []),
          new TextAreaConfig("description", { name: "Beschreibung" }, []),
          new TextAreaConfig("default", { name: "Default" }, []),
          new ValidationListConfig('validators', 'string', { name: 'Validators'})
        ], {}), generator: (formStatus: Status) => {
          return new TextAreaConfig(
            formStatus.getValueByKey('key'),
            {
              name: formStatus.getValueByKey('name'),
              description: formStatus.getValueByKey('description'),
              placeholder: formStatus.getValueByKey('placeholder'),
              default: formStatus.getValueByKey('default'),
            },
            formStatus.getValueByKey('validators'),
          )
        }, fill: (current: TextAreaConfig, form: FieldGroupConfig) => {
          let key: TextInputConfig = (form.fields[0] as TextInputConfig);
          key.settings.default = current.key;

          let name: TextInputConfig = (form.fields[1] as TextInputConfig);
          name.settings.default = current.settings.name;

          let placeholder: TextInputConfig = (form.fields[2] as TextInputConfig);
          placeholder.settings.default = current.settings.placeholder;

          let description: TextAreaConfig = (form.fields[3] as TextAreaConfig);
          description.settings.default = current.settings.description;

          let defaultValue: TextAreaConfig = (form.fields[4] as TextAreaConfig);
          defaultValue.settings.default = current.settings.default;
          
          let validators: ValidationListConfig = (form.fields[5] as ValidationListConfig);
          validators.settings.default = current.validators? current.validators: [];

          form.fields = [];
          form.fields.push(key);
          form.fields.push(name);
          form.fields.push(placeholder);
          form.fields.push(description);
          form.fields.push(defaultValue);
          form.fields.push(validators);
          form.createStatus();
          return form;
        }
      },
      (json: any) => {
        return new TextAreaConfig(
          json.key,
          json.settings,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanConditionParser.fromJson(json.visible),
        );
      }
    ));
   }
}