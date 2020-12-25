import { Field } from '../Field/Field.dto';

export interface FormStatus {
  values: { [key: string]: any };
  isValid?: boolean;
}

export class Form {
  private type: string = 'Form';
  constructor(
    public fields: Field[],
    public config?: {
      title?: string
    }
  ) {}

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