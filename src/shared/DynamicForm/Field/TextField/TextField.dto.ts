import {Field, FieldTypes} from '../Field.dto';

export class TextField extends Field {
  constructor(
    public text: string,
  ) {
    super(FieldTypes.TEXT_FIELD,{});
  }
  
  public toJson() {

    return {
      type: this.type,
      text: this.text
    }
  }
}
