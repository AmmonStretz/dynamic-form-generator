import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { FieldConfig, FieldSettings, FieldStatus } from '../../Field.config';
import { ContentFieldConfig, ContentFieldStatus } from '../ContentField.config';

export class HyperlinkFieldConfig extends ContentFieldConfig {
  constructor(
    public links: {text: string, url: string}[],
    public settings: FieldSettings,
    public visible: BooleanCondition = new BooleanConst(true),
  ) {
    super('hyperlink', settings, visible);
  }
  public createStatus(overwrite: boolean = false) {
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