import { Wizzard } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { Field, FieldConfig, FieldStatus } from '../Field.dto';
// import { FieldGroupStatus } from './FieldGroup/FieldGroup.dto';

export abstract class ContentField extends Field {
  constructor(
    public type: string,
    public config: FieldConfig,
    public visible: BooleanObject,
    public status: FieldStatus = new FieldStatus(''),
  ) {
    super(type, '', config, visible, status);
  }

  public updateStatus(): FieldStatus {
    this.status.isVisible = this.visible.calc((key: string) => this.parent.getValueByKey(key));
    return this.status;
  }

  getValueByKey(path: string): any {
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    after = after?after:'';
    if (current == 'Root:') {
      return this.root.getValueByKey(after);
    } else if (current == '..') {
      return this.parent.getValueByKey(after);
    } else if (current == '') {
      return this.status;
    }
    return null;
  }
}