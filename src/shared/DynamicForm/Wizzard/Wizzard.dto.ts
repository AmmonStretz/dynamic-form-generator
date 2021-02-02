import { Form, FormStatus } from '../Form/Form.dto';

export class WizzardStatus {
  constructor(
    public values: FormStatus[],
    public index: number,
  ) { }

  showErrorOfIndex() {
    this.values[this.index].showAllErrors();
  }
};

export class Wizzard {
  private type: string;
  constructor(
    public forms: Form[],
    public config?: {
      title?: string,
      submitButtonText?: string,
      prevButtonText?: string,
      nextButtonText?: string,
    },
    public status?: WizzardStatus,
  ) {
    this.type = 'Wizzard'
    if (!status) {

    }
  }

  public generateStatus(): WizzardStatus {
    let values: FormStatus[] = [];
    this.forms.forEach(form => {
      values.push(form.generateStatus());
    });
    // console.log('', values);

    return new WizzardStatus(values, 0);
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