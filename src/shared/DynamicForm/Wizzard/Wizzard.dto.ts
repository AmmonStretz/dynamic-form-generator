import { Form, FormStatus } from '../Form/Form.dto';

export class WizzardStatus {
  constructor(
    public index: number,
  ) { }
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
      this.status = new WizzardStatus(0);
    }
  }

  // public groupAllValues(): {[key: string]: any} {
  //   let values: {[key: string]: any} = {}
  //   this.forms.forEach(form => {
  //     form.groupAllValues(values);
  //   });
  //   return values;
  // }

  getStatusByKey(path: string):any {
    let before = path.split(/\.(.+)/)[0];
    for (let i = 0; i < this.forms.length; i++) {
      const form = this.forms[i];
      if(path == form.key ){
        return form;
      } else if(before == form.key ){
        return form.getStatusByKey(path.split(/\.(.+)/)[1]);
      }
    }
    return null;
  }

  showErrorOfIndex() {
    this.forms[this.status.index].showAllErrors();
  }

  public toJson() {
    let forms: any[] = [];
    this.forms.forEach((form: Form) => {
      forms.push(form.toJson());
    })
    return {
      type: this.type,
      config: this.config,
      forms: forms
    }
  }
}