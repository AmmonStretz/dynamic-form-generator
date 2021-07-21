import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { Status } from '@/shared/DynamicForm/status';
import { Required } from '@/shared/DynamicForm/Validators';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextAreaConfig } from '../TextArea/TextArea.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
import { ValidationListConfig } from '../ValidationList/ValidationList.config';
import { NumberInputConfig } from './NumberInput.config';
import NumberInput from './NumberInput.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<NumberInputConfig>(
      NumberInput,
      'numberInput',
      'valueField',
      {
        form: ()=> new FieldGroupConfig('number-input-form', [
          new TextInputConfig("key", { name: "Schlüssel" }, [new Required('Dieses Feld ist notwendig')]),
          new TextInputConfig("name", { name: "Name" }, []),
          new TextInputConfig("placeholder", { name: "Platzhalter" }, []),
          new NumberInputConfig("default", { name: "Default" }, []),
          new NumberInputConfig("min", { name: "Kleinster Wert" }, []),
          new NumberInputConfig("max", { name: "Größter Wert" }, []),
          new TextAreaConfig("description", { name: "Beschreibung" }, []),
          new ValidationListConfig('validators', 'number', { name: 'Validators'})
        ], {}), generator: (formStatus: Status) => {
          return new NumberInputConfig(
            formStatus.getValueByKey('key'),
            {
              name: formStatus.getValueByKey('name'),
              description: formStatus.getValueByKey('description'),
              min: formStatus.getValueByKey('min'),
              max: formStatus.getValueByKey('max'),
              default: formStatus.getValueByKey('default'),
              placeholder: formStatus.getValueByKey('placeholder')
            },
            formStatus.getValueByKey('validators'),
          )
        }, fill: (current: NumberInputConfig, form: FieldGroupConfig) => {
          
          let key: TextInputConfig = (form.fields[0] as TextInputConfig);
          key.settings.default = current.key;

          let name: TextInputConfig = (form.fields[1] as TextInputConfig);
          name.settings.default = current.settings.name;

          let placeholder: TextInputConfig = (form.fields[2] as TextInputConfig);
          placeholder.settings.default = current.settings.placeholder;

          let defaultValue: NumberInputConfig = (form.fields[3] as NumberInputConfig);
          defaultValue.settings.default = current.settings.default;

          let min: NumberInputConfig = (form.fields[4] as NumberInputConfig);
          min.settings.default = current.settings.default;

          let max: NumberInputConfig = (form.fields[5] as NumberInputConfig);
          max.settings.default = current.settings.default;

          let description: TextAreaConfig = (form.fields[6] as TextAreaConfig);
          description.settings.default = current.settings.description;
          
          let validators: ValidationListConfig = (form.fields[7] as ValidationListConfig);
          validators.settings.default = current.validators? current.validators: [];

          form.fields = [];
          form.fields.push(key);
          form.fields.push(name);
          form.fields.push(placeholder);
          form.fields.push(defaultValue);
          form.fields.push(min);
          form.fields.push(max);
          form.fields.push(description);
          form.fields.push(validators);
          return form;
        }
      },
      (json: any) => {
        return new NumberInputConfig(
          json.key,
          json.settings,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanConditionParser.fromJson(json.visible),
        );
      }
    ));
   }
}