import { Field, FieldStatus } from '../Field/Field.config';
import { FieldGroup, FieldGroupStatus } from '../Field/FieldGroup/FieldGroup.config';
import { FieldLoop, FieldLoopStatus } from '../Field/FieldLoop/FieldLoop.config';
import { ValueField, ValueFieldStatus } from '../Field/ValueFields/ValueField.config';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { Config, Status, Wizzard, WizzardStatus } from '../Wizzard/Wizzard.config';
import { ContentField, ContentFieldStatus } from '../Field/ContentFields/ContentField.config';

export class FormStatus extends Status {

  public parent: WizzardStatus;
  public children: FieldStatus[] = [];
  public config: Form;
  constructor(
    public key: string,
    public isValid?: boolean,
    public isVisible: boolean = true,
  ) {
    super();
  }
  public update(): FormStatus {
    let valide = true;
    this.children.forEach(child => {
      let childStatus: any;
      if (child instanceof ValueFieldStatus) {
        childStatus = (child as ValueFieldStatus<any>).update();
      }
      if (child instanceof FieldGroupStatus) {
        childStatus = (child as FieldGroupStatus).update();
      }
      if (child instanceof FieldLoopStatus) {
        childStatus = (child as FieldLoopStatus).update();
      }
      if (child instanceof ContentFieldStatus) {
        (child as ContentFieldStatus).update();
        return;
      }
      if (!childStatus.isValid && childStatus.isVisible) {
        valide = false;
      }
    });
    this.isValid = valide;
    this.isVisible = this.config.visible.calc(
      (key: string) => this.config.getValueByKey(key)
    );
    return this;
  }
  
  public showAllErrors(): void {
    this.children.forEach(child => {
      if (child instanceof ValueFieldStatus) {
        (child as ValueFieldStatus<any>).showAllErrors();
      } else if (child instanceof FieldGroupStatus) {
        (child as FieldGroupStatus).showAllErrors();
      } else if (child instanceof FieldLoopStatus) {
        (child as FieldLoopStatus).showAllErrors();
      }
    });
  }
}

export class Form extends Config {
  private type: string = 'Form';
  public parent: Wizzard;
  public status: FormStatus;

  constructor(
    public key: string,
    public fields: Field[],
    public settings: {
      title?: string,
      description?: string,
    },
    public visible: BooleanObject = new BooleanConst(true)
  ) {
    super();

    this.fields.forEach(field => {
      field.parent = this;
    });
  }
  createStatus() {
    this.status = new FormStatus(this.key);
    this.status.config = this;
    this.fields.forEach(field => {
      field.createStatus();
      field.status.parent = this.status;
      this.status.children.push(field.status);
    });
  }

  get root(): Wizzard {
    return this.parent;
  }

  getValueByKey(path: string): any {

    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    after = after ? after : '';

    if (current == 'Root:') {
      return this.root.getValueByKey(after);
    } else if (current == '..') {
      return this.parent.getValueByKey(after);
    } else {
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        // TODO: if path ends here
        if (current == field.status.key) {
          if (field instanceof FieldGroup) {
            return (field as FieldGroup).getValueByKey(after);
          } else if (field instanceof FieldLoop) {
            return (field as FieldLoop).getValueByKey(after);
          } else if (field instanceof ContentField) {
            return (field as ContentField).getValueByKey(after);
          } else if (field instanceof ValueField) {
            return (field as ValueField<any>).getValueByKey(after);
          }
        }
      }
    }
    return null;
  }

  public toJson() {
    return {
      type: this.type,
      settings: this.settings,
      fields: this.fields.map(field => field.toJson()),
      visible: this.visible.toJson()
    }
  }
}