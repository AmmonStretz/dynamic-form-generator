import { WizzardConfig } from '@/shared/DynamicForm/Wizzard/Wizzard.config';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { FieldConfig, FieldSettings, FieldStatus } from '../../Field.config';
import { ContentFieldConfig, ContentFieldStatus } from '../ContentField.config';

export class HyperlinkFieldConfig extends ContentFieldConfig {
  constructor(
    public links: {text: string, url: string}[],
    public settings: FieldSettings,
    public visible: BooleanObject,
  ) {
    super('hyperlink', settings, visible);
  }
  public createStatus() {
    this.status = new ContentFieldStatus(this.key);
    this.status.config = this;
  }

  public toJson() {
    return {
      type: 'hyperlink',
      links: this.links
    }
  }
}