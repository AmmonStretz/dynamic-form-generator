import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { Status } from '@/shared/DynamicForm/status';
import { ValidatorParser } from '@/shared/DynamicForm/Validators';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
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
        ], {}), generator: (formStatus: Status) => {
          return new TextAreaConfig(
            formStatus.getValueByKey('key'),
            {
              name: formStatus.getValueByKey('name'),
            }
          )
        }, fill: (current: TextAreaConfig, form: FieldGroupConfig) => {
          console.log('textArea', current, form);
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