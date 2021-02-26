import { Field, FieldStatus } from '../Field/Field.dto';
import { FieldGroup } from '../Field/FieldGroup/FieldGroup.dto';
import { FieldLoop, FieldLoopStatus } from '../Field/FieldLoop/FieldLoop.dto';
import { ValueField } from '../Field/ValueFields/ValueField.dto';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { Wizzard } from '../Wizzard/Wizzard.dto';
import { ContentField } from '../Field/ContentFields/ContentField.dto';

export class FormStatus {
  constructor(
    public key: string,
    public isValid?: boolean,
    public isVisible: boolean = true,
  ) { }
}

export class Form {
  private type: string = 'Form';
  public parent: Wizzard;
  constructor(
    public key: string,
    public fields: Field[],
    public config: {
      title?: string,
      description?: string,
    },
    public visible: BooleanObject = new BooleanConst(true),
    public status?: FormStatus,
  ) {
    if (!this.status) {
      this.status = new FormStatus(this.key);
    }
    this.fields.forEach(field => {
      field.parent = this;
    });
  }

  get root(): Wizzard {
    return this.parent;
  }

  public updateStatus(): FieldStatus {
    let valide = true;
    this.fields.forEach(field => {
      let childStatus;
      if (field instanceof ValueField) {
        childStatus = (field as ValueField<any>).updateStatus();
      }
      if (field instanceof FieldGroup) {
        childStatus = (field as FieldGroup).updateStatus();
      }
      if (field instanceof FieldLoop) {
        childStatus = (field as FieldLoop).updateStatus();
      }
      if (field instanceof ContentField) {
        (field as ContentField).updateStatus();
        return;
      }
      if (!childStatus.isValid && childStatus.isVisible) {
        valide = false;
      }
    });

    this.status.isValid = valide;
    this.status.isVisible = this.visible.calc((key: string) => this.getValueByKey(key));
    return this.status;
  }

  getValueByKey(path: string): any {
    
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    after = after?after:'';

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

  public toJson() {
    return {
      type: this.type,
      config: this.config,
      fields: this.fields.map(field => field.toJson()),
      visible: this.visible.toJson()
    }
  }
}