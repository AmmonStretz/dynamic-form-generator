import { BooleanObjectParser } from '@/shared/Math/parsers/boolean.class';
import { ParagraphField } from './Paragraph.config';
import ParagraphFieldComponent from './Paragraph.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(ParagraphFieldComponent.name, ParagraphFieldComponent);
    Vue.contentFields.push(ParagraphFieldComponent.name);
    Vue.fieldParser['paragraph'] = (json: any)=> {
      return new ParagraphField(
        json.links,
        json.config,
        BooleanObjectParser.fromJson(json.visible)
      );
    }
  }
}