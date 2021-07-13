import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { Status } from '@/shared/DynamicForm/status';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextAreaConfig } from '../../ValueFields/TextArea/TextArea.config';
import { TextInputConfig } from '../../ValueFields/TextInput/TextInput.config';
import { ParagraphConfig } from './Paragraph.config';
import ParagraphField from './Paragraph.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<ParagraphConfig>(
      ParagraphField,
      'paragraph',
      'contentField',
      {
        form: new FieldGroupConfig('paragraph-form', [
          new TextInputConfig("name", { name: "Name" }, []),
          new TextAreaConfig("text", { name: "Text", description: 'Dieses Feld definiert den Inhalt des Absatzes.' }, []),
        ], {}), generator: (formStatus: Status) => {
          return new ParagraphConfig(
            formStatus.getValueByKey('text'),
            { name: formStatus.getValueByKey('name') }
          )
        }, fill: (current: ParagraphConfig, form: FieldGroupConfig) => {
          let name: TextInputConfig = (form.fields[0] as TextInputConfig);
          name.settings.default = current.settings.name;

          let text: TextAreaConfig = (form.fields[1] as TextAreaConfig);
          text.settings.default = current.text;

          form.fields = [];
          form.fields.push(name);
          form.fields.push(text);
          form.createStatus();
          return form;
        }
      },
      (json: any) => {
        return new ParagraphConfig(
          json.text,
          json.settings,
          BooleanConditionParser.fromJson(json.visible)
        );
      }
    ));
  }
}