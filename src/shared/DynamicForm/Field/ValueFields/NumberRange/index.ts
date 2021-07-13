import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { Status } from '@/shared/DynamicForm/status';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { NumberInputConfig } from '../NumberInput/NumberInput.config';
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
        form: new FieldGroupConfig('number-range-form', [
          new TextInputConfig("key", { name: "Key" }, []),
          new NumberInputConfig("min", { name: "min" }, []),
          new NumberInputConfig("max", { name: "max" }, []),
          new NumberInputConfig("step", { name: "step" }, []),
        ], {}), generator: (formStatus: Status) => {
          return new NumberRangeConfig(
            formStatus.getValueByKey('key'),
            {
              min: formStatus.getValueByKey('min'),
              max: formStatus.getValueByKey('max'),
              step: formStatus.getValueByKey('step'),
            }
          )
        }, fill: (current: NumberRangeConfig, form: FieldGroupConfig) => {
          console.log('numberRange', current, form);
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