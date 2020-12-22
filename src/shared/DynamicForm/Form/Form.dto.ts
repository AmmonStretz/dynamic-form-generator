import { Field } from '../Field/Field.dto';

export interface FormStatus {
  values: { [key: string]: any };
  isValide?: boolean;
}

export class Form {
  private type: string;
  constructor(
    public fields: Field[],
    public config?: {
      title?: string
    }
  ) {
    this.type = 'Form';
  }

  public toJson() {
    let fields: any[] = [];
    this.fields.forEach(field => {
      fields.push(field.toJson())
    })
    return {
      type: this.type,
      config: this.config,
      fields: fields
    }
  }
}