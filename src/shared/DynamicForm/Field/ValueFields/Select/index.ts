import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { PluginService } from '@/shared/DynamicForm/services/Plugin.service';
import { Status } from '@/shared/DynamicForm/status';
import { Required } from '@/shared/DynamicForm/Validators';
import { ValidatorParser } from '@/shared/DynamicForm/Validators/validator.parser';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { NumberConst, NumberVar } from '@/shared/ts-condition-parser/objects/number.class';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { FieldLoopConfig } from '../../FieldLoop/FieldLoop.config';
import { NumberInputConfig } from '../NumberInput/NumberInput.config';
import { TextInputConfig } from '../TextInput/TextInput.config';
import { ValueFieldStatus } from '../ValueField.config';
import { SelectConfig } from './Select.config';
import Select from './Select.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<SelectConfig>(
      Select,
      'select',
      'valueField',
      { //TODO: multiple options with loop
        form: ()=> new FieldGroupConfig('select-form', [
          new TextInputConfig("key", { name: "Schlüssel" }, [new Required('Dieses Feld ist notwendig')]),
          new TextInputConfig("name", { name: "Name" }, []),
          new NumberInputConfig("numberOfOptions", { name: "numberOfOptions", min: 1, default: 1 }, []),
          new FieldLoopConfig("options-list", new FieldGroupConfig('option-group', [
            new TextInputConfig("name", { name: "name" }, [new Required('Dieses Feld ist notwendig')]),
            new NumberInputConfig("value", { name: "value" }, [new Required('Dieses Feld ist notwendig')])
          ], {}), {}, new BooleanConst(true), new NumberVar('../../numberOfOptions'))
        ], {}), generator: (formStatus: Status) => {
          let options: {name: string, value: number }[] = [];
          for (let i = 0; i < formStatus.children[3].children.length; i++) {
            const name = (formStatus.children[3].children[i].children[0] as ValueFieldStatus<string>).value;
            const value = (formStatus.children[3].children[i].children[1] as ValueFieldStatus<number>).value;
            options.push({name, value})
          }
          
          return new SelectConfig(
            formStatus.getValueByKey('key'),
            options,
            {
              name: formStatus.getValueByKey('name')
            }
          )
        }, fill: (current: SelectConfig, form: FieldGroupConfig) => {
          let key: TextInputConfig = (form.fields[0] as TextInputConfig);
          key.settings.default = current.key+111;

          let name: TextInputConfig = (form.fields[1] as TextInputConfig);
          name.settings.default = current.settings.name;
          
          let numberOfOptions: NumberInputConfig = (form.fields[2] as NumberInputConfig);
          numberOfOptions.settings.default = current.options.length;

          let options: FieldLoopConfig = (form.fields[3] as FieldLoopConfig);

          form.fields = [];
          form.fields.push(key);
          form.fields.push(name);
          form.fields.push(numberOfOptions);
          form.fields.push(options);

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