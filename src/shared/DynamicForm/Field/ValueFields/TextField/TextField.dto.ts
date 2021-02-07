import { Wizzard } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import { BooleanObject } from '../../../math-logic/math-object.class';
import { BooleanConst } from '../../../math-logic/objects/boolean/const';
import {Field, FieldStatus, FieldTypes} from '../../Field.dto';
import { ValueFieldStatus } from '../ValueField.dto';

export class TextField extends Field {
  constructor(
    public text: string,
    public visible: BooleanObject = new BooleanConst(true),
    status?: FieldStatus, // TODO
  ) {
    super(FieldTypes.TEXT_FIELD,{}, visible, status);
  }

  public updateStatus(root: Wizzard): FieldStatus {
    this.status.visible = this.visible.calc((key: string)=>root.getStatusByKey(key));
    return this.status;
  }
  
  public toJson() {

    return {
      type: this.type,
      text: this.text
    }
  }
}
