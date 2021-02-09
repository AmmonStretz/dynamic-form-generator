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

  getValueByKey(path: string):any {
    let before = path.split(/\.(.+)/)[0];
    for (let i = 0; i < this.forms.length; i++) {
      const form = this.forms[i];
      // TODO: if path ends here
      if(before == form.key ){
        return form.getValueByKey(path.split(/\.(.+)/)[1]);
      }
    }
    return null;
  }

  public updateStatus() {
    this.forms.forEach(form => form.updateStatus(this));
  }

  showErrorOfIndex() {
    this.forms[this.status.index].showAllErrors();
  }

  public toJson() {
    return {
      type: this.type,
      config: this.config,
      forms: this.forms.map(form => form.toJson())
    }
  }
}