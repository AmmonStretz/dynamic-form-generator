import { WizzardConfig } from '@/shared/DynamicForm/Wizzard/Wizzard.config';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { FieldConfig, FieldSettings, FieldStatus } from '../../Field.config';
import { ContentFieldConfig, ContentFieldStatus } from '../ContentField.config';
// import { FieldGroupStatus } from './FieldGroup/FieldGroup.dto';

export class ParagraphFieldConfig extends ContentFieldConfig {
  constructor(
    public text: string,
    public settings: FieldSettings,
    public visible: BooleanObject,
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