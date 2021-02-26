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
    this.forms.forEach(form => {
      form.parent = this;
    });
  }

  getValueByKey(path: string):any {
    
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    after = after?after:'';
    if (current == 'Root:') {
      return this.getValueByKey(after);
    } else if (current != '..') {
      for (let i = 0; i < this.forms.length; i++) {
        const form = this.forms[i];
        // TODO: if path ends here
        if(current == form.key ){
          return form.getValueByKey(after);
        }
      }
      return null;
    }
  }

  public updateStatus() {
    this.forms.forEach(form => form.updateStatus());
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