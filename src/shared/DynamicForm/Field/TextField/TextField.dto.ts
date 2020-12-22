import {Field} from '../Field.dto';

export class TextField extends Field {
  constructor(
    public text: string,
  ) {
    super({});
    this.type = 'TextField'
  }
  
  public toJson() {

    return {
      type: this.type,
      text: this.text
    }
  }
}
