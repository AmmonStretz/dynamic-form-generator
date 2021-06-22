import { Config } from '../config';
import { FinderConfig, FinderStatus } from '../Finder/Finder.config';
import { FormConfig, FormStatus } from '../Form/Form.config';
import { Status } from '../status';

export class WizardStatus extends Status {
  public children: FormStatus[] = [];
  public parent: FinderStatus;
  constructor(
    public index: number,
    public isValid?: boolean,
    public isVisible: boolean = true,
  ) {
    super();
  }
  public update(): WizardStatus {
    this.children.forEach(child => child.update());
    return this;
  }
  public showAllErrors(): void {
    this.children[this.index].showAllErrors();
  }

  getValueByKey(path: string):any {
    
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    after = after?after:'';
    
    if (current == 'Root:') {
      return this.getValueByKey(after);
    } else if (current != '..') {
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        // TODO: if path ends here
        if(current == child.key ){
          return child.getValueByKey(after);
        }
      }
      return null;
    }
  }
};


export class WizardConfig extends Config{
  private type: string;
  public status: WizardStatus;
  public parent: FinderConfig;

  constructor(
    public forms: FormConfig[],
    public settings: {
      title?: string,
      submitButtonText?: string,
      prevButtonText?: string,
      nextButtonText?: string,
    },
  ) {
    super();
    this.type = 'Wizard'
    this.forms.forEach(form => {
      form.parent = this;
    });
  }
  createStatus() {
    // DEFAULT Status
    this.status = new WizardStatus(0);
    this.status.config = this;
    this.forms.forEach(form => {
      form.createStatus();
      form.status.parent = this.status;
      this.status.children.push(form.status);
    });
  }
  public toJson() {
    return {
      type: this.type,
      settings: this.settings,
      forms: this.forms.map(form => form.toJson())
    }
  }
}