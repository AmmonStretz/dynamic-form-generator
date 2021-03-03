import { BooleanObjectParser } from '@/shared/Math/parsers/boolean.class';
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
        BooleanObjectParser.fromJson(json.visible)
      );
    }
  }
}