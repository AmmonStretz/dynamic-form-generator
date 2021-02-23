import { Wizzard } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { Field, FieldConfig, FieldStatus } from '../../Field.dto';
import { ContentField } from '../ContentField.dto';
// import { FieldGroupStatus } from './FieldGroup/FieldGroup.dto';

export class HyperlinkField extends ContentField {
  constructor(
    public links: {text: string, url: string}[],
    public config: FieldConfig,
    public visible: BooleanObject,
    public status: FieldStatus = new FieldStatus(''),
  ) {
    super('hyperlink', config, visible, status);
    
  }

  public toJson() {
    return {
      type: 'hyperlink',
      links: this.links
    }
  }
}