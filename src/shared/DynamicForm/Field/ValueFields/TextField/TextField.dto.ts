import { BooleanObject } from '../../../math-logic/math-object.class';
import { BooleanConst } from '../../../math-logic/objects/boolean/const';
import {Field, FieldTypes} from '../../Field.dto';

export class TextField extends Field {
  constructor(
    public text: string,
    public visible: BooleanObject = new BooleanConst(true),
  ) {
    super(FieldTypes.TEXT_FIELD,{}, visible);
  }
  
  public toJson() {

    return {
      type: this.type,
      text: this.text
    }
  }
}
