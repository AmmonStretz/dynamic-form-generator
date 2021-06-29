import { FieldPlugin } from '@/shared/DynamicForm/Plugin/FieldPlugin.class';
import { Status } from '@/shared/DynamicForm/status';
import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { FieldGroupConfig } from '../../FieldGroup/FieldGroup.config';
import { TextAreaConfig } from '../../ValueFields/TextArea/TextArea.config';
import { TextInputConfig } from '../../ValueFields/TextInput/TextInput.config';
import { HyperlinkFieldConfig } from './Hyperlink.config';
import HyperlinkFieldComponent from './Hyperlink.vue';

export default {
  install: (Vue: any, options: any) => {
    (Vue as any).fieldPlugins.push(new FieldPlugin<HyperlinkFieldConfig>(
      HyperlinkFieldComponent,
      'hyperlink',
      'contentField',
      { //TODO: multiple links
        form: new FieldGroupConfig('hyperlink-form', [
          new TextInputConfig("text", { name: "Text" }, []),
          new TextInputConfig("url", { name: "Url" }, []),
        ], {}), generator: (formStatus: Status) => {
          return new HyperlinkFieldConfig(
            [{
              text: formStatus.getValueByKey('text'),
              url: formStatus.getValueByKey('url')
            }],
            {}
          )
        }, fill: (current: HyperlinkFieldConfig, form: FieldGroupConfig) => {
          console.log('hyperlink', current, form);
          return form;
        }
      },
      (json: any) => {
        return new HyperlinkFieldConfig(
          json.links,
          json.config,
          BooleanConditionParser.fromJson(json.visible)
        );
      }
    ));
  }
}