import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { Status } from '@/shared/DynamicForm/status';
import { Required } from '@/shared/DynamicForm/Validators';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { NumberInputConfig } from '../NumberInput/NumberInput.config';
import { TextAreaConfig } from '../TextArea/TextArea.config';
import { ValidationListConfig } from '../ValidationList/ValidationList.config';
import { TextInputConfig } from './TextInput.config';
import TextInput from './TextInput.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<TextInputConfig>(
      TextInput,
      'textInput',
      'valueField',
      { //TODO: multiple links
        form: ()=> new FieldGroupConfig('text-input-form', [
          new TextInputConfig("key", { name: "Schlüssel" }, [new Required('Dieses Feld ist notwendig')]),
          new TextInputConfig("name", { name: "Name" }, []),
          new TextInputConfig("placeholder", { name: "Platzhalter" }, []),
          new TextAreaConfig("description", { name: "Beschreibung" }, []),
          new TextAreaConfig("default", { name: "Default" }, []),
          new NumberInputConfig("maxLength", { name: "Maximale Anzahl Zeichen" }, []),
          new ValidationListConfig('validators', 'string', { name: 'Validators'})
        ], {}), generator: (formStatus: Status) => {
          return new TextInputConfig(
            formStatus.getValueByKey('key'),
            {
              name: formStatus.getValueByKey('name'),
              description: formStatus.getValueByKey('description'),
              default: formStatus.getValueByKey('default'),
              placeholder: formStatus.getValueByKey('placeholder'),
              maxLength: formStatus.getValueByKey('maxLength')
            },
            formStatus.getValueByKey('validators'),
          )
        }, fill: (current: TextInputConfig, form: FieldGroupConfig) => {
          
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

          let maxLength: NumberInputConfig = (form.fields[5] as NumberInputConfig);
          maxLength.settings.default = current.settings.maxLength;
          
          let validators: ValidationListConfig = (form.fields[6] as ValidationListConfig);
          validators.settings.default = current.validators? current.validators: [];

          form.fields = [];
          form.fields.push(key);
          form.fields.push(name);
          form.fields.push(placeholder);
          form.fields.push(description);
          form.fields.push(defaultValue);
          form.fields.push(maxLength);
          form.fields.push(validators);
          form.createStatus();
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