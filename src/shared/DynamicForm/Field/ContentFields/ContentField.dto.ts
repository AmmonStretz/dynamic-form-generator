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

  public updateStatus(root: Wizzard): FieldStatus {
    this.status.isVisible = this.visible.calc((key: string) => root.getValueByKey(key));
    return this.status;
  }
}