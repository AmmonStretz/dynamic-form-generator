import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { Status } from '@/shared/DynamicForm/status';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextAreaConfig } from '../TextArea/TextArea.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
import { ValueFieldStatus } from '../ValueField.config';
import { NumberInputConfig } from './NumberInput.config';
import NumberInputFieldComponent from './NumberInput.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<NumberInputConfig>(
      NumberInputFieldComponent,
      'numberInput',
      'valueField',
      { //TODO: multiple links
        form: new FieldGroupConfig('number-input-form', [
          new TextInputConfig("key", { name: "Key" }, []),
          new TextInputConfig("name", { name: "Name" }, []),
          new TextInputConfig("placeholder", { name: "Platzhalter" }, []),
          new TextInputConfig("question", { name: "Frage" }, []),
          new TextAreaConfig("description", { name: "Beschreibung" }, []),
        ], {}), generator: (formStatus: Status) => {
          console.log({
            name: formStatus.getValueByKey('name'),
            description: formStatus.getValueByKey('description')
          })
          return new NumberInputConfig(
            formStatus.getValueByKey('key'),
            {
              name: formStatus.getValueByKey('name'),
              description: formStatus.getValueByKey('description')
            }
          )
        }, fill: (current: NumberInputConfig, form: FieldGroupConfig) => {
          
          let key: TextInputConfig = (form.fields[0] as TextInputConfig);
          key.settings.default = current.key;

          let name: TextInputConfig = (form.fields[1] as TextInputConfig);
          name.settings.default = current.settings.name;

          let placeholder: TextInputConfig = (form.fields[2] as TextInputConfig);
          placeholder.settings.default = current.settings.placeholder;

          let description: TextAreaConfig = (form.fields[3] as TextAreaConfig);
          description.settings.default = current.settings.description;

          form.fields = [];
          form.fields.push(key);
          form.fields.push(name);
          form.fields.push(placeholder);
          form.fields.push(description);
          form.createStatus();
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