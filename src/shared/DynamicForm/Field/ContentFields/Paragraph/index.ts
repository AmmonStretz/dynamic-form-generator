import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { Status } from '@/shared/DynamicForm/status';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextAreaConfig } from '../../ValueFields/TextArea/TextArea.config';
import { TextInputConfig } from '../../ValueFields/TextInput/TextInput.config';
import { ParagraphFieldConfig } from './Paragraph.config';
import ParagraphFieldComponent from './Paragraph.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<ParagraphFieldConfig>(
      ParagraphFieldComponent,
      'paragraph',
      'contentField',
      {
        form: new FieldGroupConfig('paragraph-form', [
          new TextInputConfig("title", { name: "Titel" }, []),
          new TextAreaConfig("text", { name: "Text", description: 'Dieses Feld definiert den Inhalt des Absatzes.' }, []),
        ], {}), generator: (formStatus: Status) => {
          return new ParagraphFieldConfig(
            formStatus.getValueByKey('text'),
            {}
          )
        }, fill: (current: ParagraphFieldConfig, form: FieldGroupConfig) => {
          console.log('paragraph', current, form);
          return form;
        }
      },
      (json: any) => {
        return new ParagraphFieldConfig(
          json.text,
          json.config,
          BooleanConditionParser.fromJson(json.visible)
        );
      }
    ));
  }
}