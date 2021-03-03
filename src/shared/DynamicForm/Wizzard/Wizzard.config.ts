import { FormConfig, FormStatus } from '../Form/Form.config';

export abstract class Config {
  public status: Status;
  public abstract settings: any;
  public abstract createStatus(): void;
  public abstract toJson(): any;
}
export abstract class Status {
  public config: Config;
  public children: Status[] = [];
  public parent: Status;
  public abstract update(): Status;
  public abstract showAllErrors(): void;
  public abstract getValueByKey(path: string):any;
}
export class WizzardStatus extends Status {
  public children: FormStatus[] = [];
  constructor(
    public index: number,
  ) {
    super();
  }
  public update(): WizzardStatus {
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


export class WizzardConfig extends Config{
  private type: string;
  public status: WizzardStatus;
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
    this.type = 'Wizzard'
    this.forms.forEach(form => {
      form.parent = this;
    });
  }
  createStatus() {
    // DEFAULT Status
    this.status = new WizzardStatus(0);
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