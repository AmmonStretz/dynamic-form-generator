import { Wizzard } from '@/shared/DynamicForm/Wizzard/Wizzard.config';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { Field, FieldSettings, FieldStatus } from '../Field.config';
// import { FieldGroupStatus } from './FieldGroup/FieldGroup.dto';
export class ContentFieldStatus extends FieldStatus {
  public config: ContentField;
  public update(): FieldStatus {
    this.isVisible = this.config.visible.calc((key: string) => this.parent.getValueByKey(key));
    return this;
  }
  getValueByKey(path: string): any {
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    after = after?after:'';
    if (current == 'Root:') {
      return this.config.root.status.getValueByKey(after);
    } else if (current == '..') {
      return this.parent.getValueByKey(after);
    } else if (current == '') {
      return this;
    }
    return null;
  }
}
export abstract class ContentField extends Field {
  constructor(
    public type: string,
    public settings: FieldSettings,
    public visible: BooleanObject
  ) {
    super(type, '', settings, visible);
  }
}