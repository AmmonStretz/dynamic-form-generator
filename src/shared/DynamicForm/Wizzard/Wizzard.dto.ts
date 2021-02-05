import { Form, FormStatus } from '../Form/Form.dto';

export class WizzardStatus {
  constructor(
    public forms: FormStatus[],
    public index: number,
  ) { }

  public groupAllValues(): {[key: string]: any} {
    let values: {[key: string]: any} = {}
    this.forms.forEach(form => {
      form.groupAllValues(values);
    });
    return values;
  }

  // public calcValue(key: string): any {
  //   for (let i = 0; i < this.values.length; i++) {
  //     const value = this.values[i].calcValue(key);
  //     if(!!value){
  //       return value();
  //     }
  //   }
  //   return null;
  // }

  showErrorOfIndex() {
    this.forms[this.index].showAllErrors();
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
    for (let i = 0; i < this.forms.length; i++) {
      const form = this.forms[i];
      values.push(form.generateStatus());
    }
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