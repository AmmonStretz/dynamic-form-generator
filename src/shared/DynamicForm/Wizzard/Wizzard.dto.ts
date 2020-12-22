import { Form, FormStatus } from '../Form/Form.dto';

export interface WizzardStatus {
  values: FormStatus[];
  index: number;
};

export class Wizzard {
  private type: string;
  constructor(
    public forms: Form[],
    public config?: {
      title?: string,
    }
  ) {
    this.type = 'Wizzard'
  }

  public toJson() {
    let forms: any[] = [];
    this.forms.forEach((form: Form) => {
      forms.push(form.toJson())
    })
    return {
      type: this.type,
      config: this.config,
      forms: forms
    }
  }
}