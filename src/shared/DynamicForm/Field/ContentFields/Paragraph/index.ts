import { BooleanConditionParser } from '@/shared/ts-condition-parser/parsers/boolean.class';
import { ParagraphFieldConfig } from './Paragraph.config';
import ParagraphFieldComponent from './Paragraph.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(ParagraphFieldComponent.name, ParagraphFieldComponent);
    Vue.contentFields.push(ParagraphFieldComponent.name);
    Vue.fieldParser['paragraph'] = (json: any)=> {
      return new ParagraphFieldConfig(
        json.links,
        json.config,
        BooleanConditionParser.fromJson(json.visible)
      );
    }
  }
}