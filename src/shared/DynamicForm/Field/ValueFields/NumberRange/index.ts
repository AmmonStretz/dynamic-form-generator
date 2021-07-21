import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { Status } from '@/shared/DynamicForm/status';
import { Required } from '@/shared/DynamicForm/Validators';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { NumberInputConfig } from '../NumberInput/NumberInput.config';
import { TextAreaConfig } from '../TextArea/TextArea.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
import { NumberRangeConfig } from './NumberRange.config';
import NumberRange from './NumberRange.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<NumberRangeConfig>(
      NumberRange,
      'numberRange',
      'valueField',
      {
        form: ()=> new FieldGroupConfig('number-range-form', [
          new TextInputConfig("key", { name: "Schlüssel" }, [new Required('Dieses Feld ist notwendig')]),
          new TextInputConfig("name", { name: "name" }, []),
          new NumberInputConfig("min", { name: "Kleinster Wert" }, [new Required('Dieses Feld ist notwendig')]),
          new NumberInputConfig("max", { name: "Größter Wert" }, [new Required('Dieses Feld ist notwendig')]),
          new NumberInputConfig("step", { name: "Schrittgröße" }, [new Required('Dieses Feld ist notwendig')]),
          new TextAreaConfig("description", { name: "description" }, []),
          new NumberInputConfig("default", { name: "default" }, []),
        ], {}), generator: (formStatus: Status) => {
          return new NumberRangeConfig(
            formStatus.getValueByKey('key'),
            {
              name: formStatus.getValueByKey('name'),
              min: formStatus.getValueByKey('min'),
              max: formStatus.getValueByKey('max'),
              step: formStatus.getValueByKey('step'),
              description: formStatus.getValueByKey('description'),
              default: formStatus.getValueByKey('default'),
            }
          )
        }, fill: (current: NumberRangeConfig, form: FieldGroupConfig) => {
          let key: TextInputConfig = (form.fields[0] as TextInputConfig);
          key.settings.default = current.key;

          let name: TextInputConfig = (form.fields[1] as TextInputConfig);
          name.settings.default = current.settings.name;
          
          let min: NumberInputConfig = (form.fields[2] as NumberInputConfig);
          min.settings.default = current.settings.default;
          
          let max: NumberInputConfig = (form.fields[3] as NumberInputConfig);
          max.settings.default = current.settings.default;
          
          let step: NumberInputConfig = (form.fields[4] as NumberInputConfig);
          step.settings.default = current.settings.default;

          let description: TextAreaConfig = (form.fields[5] as TextAreaConfig);
          description.settings.default = current.settings.description;

          let defaultValue: NumberInputConfig = (form.fields[6] as NumberInputConfig);
          defaultValue.settings.default = current.settings.default;

          form.fields = [];
          form.fields.push(key);
          form.fields.push(name);
          form.fields.push(min);
          form.fields.push(max);
          form.fields.push(step);
          form.fields.push(description);
          form.fields.push(defaultValue);
          return form;
        }
      },
      (json: any) => {
        return new NumberRangeConfig(
          json.key,
          json.settings,
          ValidatorParser.parseFromJSONArray(json.validators),
          BooleanConditionParser.fromJson(json.visible),
        );
      }
    ));
   }
}