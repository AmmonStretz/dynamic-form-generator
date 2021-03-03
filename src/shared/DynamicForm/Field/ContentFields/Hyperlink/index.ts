import { BooleanObjectParser } from '@/shared/Math/parsers/boolean.class';
import { HyperlinkFieldConfig } from './Hyperlink.config';
import HyperlinkFieldComponent from './Hyperlink.vue';

export default {
  install: (Vue: any, options: any) => {
    Vue.component(HyperlinkFieldComponent.name, HyperlinkFieldComponent);
    Vue.contentFields.push(HyperlinkFieldComponent.name)
    Vue.fieldParser['hyperlink'] = (json: any)=> {
      return new HyperlinkFieldConfig(
        json.links,
        json.config,
        BooleanObjectParser.fromJson(json.visible)
      );
    }
   }
}