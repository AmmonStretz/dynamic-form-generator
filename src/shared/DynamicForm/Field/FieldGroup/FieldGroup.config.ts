import { FieldStatus } from '../Field.config';
import { Field } from '../Field.config';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { FieldLoop, FieldLoopStatus } from '../FieldLoop/FieldLoop.config';
import { ValueField, ValueFieldSettings, ValueFieldStatus } from '../ValueFields/ValueField.config';
import { Wizzard } from '../../Wizzard/Wizzard.config';
import { ContentField } from '../ContentFields/ContentField.config';

export class FieldGroupStatus extends FieldStatus {
  public config: FieldGroup;
  constructor(
    public key: string,
    public isValid?: boolean,
    public isVisible: boolean = true,
  ) {
    super(key, isValid, isVisible);
  }
  public update(): FieldGroupStatus {
    let valide = true;
    this.children.forEach(child => {
      let childStatus: FieldStatus;
      if (child instanceof ValueFieldStatus) {
        childStatus = (child as ValueFieldStatus<any>).update();
      }
      if (child instanceof FieldGroupStatus) {
        childStatus = (child as FieldGroupStatus).update();
      }
      if (child instanceof FieldLoopStatus) {
        childStatus = (child as FieldLoopStatus).update();
      }
      if (!childStatus.isValid && !!childStatus.isVisible) {
        valide = false;
      }
    });
    this.isValid = valide;
    this.isVisible = this.config.visible.calc(this.config.getValueByKey);
    return this;
  }
}

export interface FieldGroupSettings extends ValueFieldSettings<{ [key: string]: any }> {
  title?: string,
  horizontal?: boolean;
  description?: string;
}

export class FieldGroup extends Field {

  public status: FieldGroupStatus;
  constructor(
    public key: string,
    public fields: Field[],
    public settings: FieldGroupSettings,
    public visible: BooleanObject = new BooleanConst(true)
  ) {
    super(
      'fieldGroup',
      key,
      settings,
      visible
    );
    this.fields.forEach(field => {
      field.parent = this;
    });
  }
  public createStatus() {
    this.status = new FieldGroupStatus(this.key);
    this.status.config = this;
    this.fields.forEach(field => {
      field.createStatus();
      field.status.parent = this.status;
      this.status.children.push(field.status);
    });
  }

  public updateStatus(): FieldGroupStatus {
    let valide = true;
    this.fields.forEach(field => {
      let childStatus: FieldStatus;
      if (field instanceof ValueField) {
        childStatus = (field as ValueField<any>).updateStatus();
      }
      if (field instanceof FieldGroup) {
        childStatus = (field as FieldGroup).updateStatus();
      }
      if (field instanceof FieldLoop) {
        childStatus = (field as FieldLoop).updateStatus();
      }
      if (!childStatus.isValid && !!childStatus.isVisible) {
        valide = false;
      }
    });
    this.status.isValid = valide;
    this.status.isVisible = this.visible.calc(this.getValueByKey);
    return this.status;
  }

  getValueByKey(path: string): any {
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    after = after?after:'';
    // TODO: if path ends here
    if (current == 'Root:') {
      return this.root.getValueByKey(after);
    } else if (current == '..') {
      return this.parent.getValueByKey(after);
    } else {
      for (const key in this.fields) {
        if (Object.prototype.hasOwnProperty.call(this.fields, key)) {
          const field = this.fields[key];
          if (current == field.status.key) {
            if (field instanceof ContentField) {
              return (field as ContentField).getValueByKey(after);
            } else if (field instanceof ValueField) {
              return (field as ValueField<any>).getValueByKey(after);
            } else if (field instanceof FieldGroup) {
              return field.getValueByKey(after);
            } else if (field instanceof FieldLoop) {
              return (field as FieldLoop).getValueByKey(after);
            }
          }
        }
      }
    }
    return null;
  }

  public showAllErrors(): void {
    this.fields.forEach(field => {
      if (field instanceof ValueField) {
        (field as ValueField<any>).showAllErrors();
      } else if (field instanceof FieldGroup) {

        (field as FieldGroup).showAllErrors();
      } else if (field instanceof FieldLoop) {
        (field as FieldLoop).showAllErrors();
      }
    });
  }

  public updateValidity() {
    this.fields.forEach(field => {
      if (field instanceof ValueField) {
        if (!field.status.isVisible) {
          this.status.isValid = true;
        }
      } else if (field instanceof FieldGroup) {
        (field as FieldGroup).updateValidity();
        if (!field.visible) {
          this.status.isValid = true;
        }
      } else if (field instanceof FieldLoop) {
        (field as FieldLoop).updateValidity();
        if (!field.visible) {
          this.status.isValid = true;
        }
      }
    });
  }

  public toJson() {
    let fields: any[] = [];
    this.fields.forEach(field => {
      fields.push(field.toJson())
    })

    return {
      type: this.type,
      fields: fields,
      settings: this.settings,
      visible: this.visible,
    }
  }
}
