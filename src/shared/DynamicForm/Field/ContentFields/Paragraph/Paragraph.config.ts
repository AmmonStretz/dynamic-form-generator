import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { FieldConfig, FieldSettings, FieldStatus } from '../../Field.config';
import { ContentFieldConfig, ContentFieldStatus } from '../ContentField.config';
// import { FieldGroupStatus } from './FieldGroup/FieldGroup.dto';

export class ParagraphConfig extends ContentFieldConfig {
  constructor(
    public text: string,
    public settings: FieldSettings,
    public visible: BooleanCondition = new BooleanConst(true),
  ) {
    super('paragraph', settings, visible);
  }
  public createStatus() {
    this.status = new ContentFieldStatus(this.key);
    this.status.config = this;
  }

  public toJson() {
    return {
      type: 'paragraph',
      text: this.text
    }
  }
}