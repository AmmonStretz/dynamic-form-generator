import { Field, FieldStatus } from '../Field/Field.dto';
import { FieldGroup } from '../Field/FieldGroup/FieldGroup.dto';
import { FieldLoop, FieldLoopStatus } from '../Field/FieldLoop/FieldLoop.dto';
import { ValueField } from '../Field/ValueFields/ValueField.dto';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { Wizzard } from '../Wizzard/Wizzard.dto';

export class FormStatus {
  constructor(
    public key: string,
    public isValid?: boolean,
    public isVisible: boolean = true,
  ) { }
}

export class Form {
  private type: string = 'Form';
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
    if(!this.status){
      this.status = new FormStatus(this.key);
    }
  }

  public updateStatus(root: Wizzard): FieldStatus {
    let valide = true;
    this.fields.forEach(field => {
      let childStatus;
      if (field instanceof ValueField) {
        childStatus = (field as ValueField<any>).updateStatus(root);
      }
      if (field instanceof FieldGroup) {
        childStatus = (field as FieldGroup).updateStatus(root);
      }
      if (field instanceof FieldLoop) {
        childStatus = (field as FieldLoop).updateStatus(root);
      }
      if(!childStatus.isValid && childStatus.isVisible){
        valide = false;
      }
    });
    
    this.status.isValid = valide;
    this.status.isVisible = this.visible.calc((key: string)=>root.getValueByKey(key));
    return this.status;
  }

  getValueByKey(path: string): any {
    let before = path.split(/\.(.+)/)[0];
    let after = path.split(/\.(.+)/)[1];
     
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      // TODO: if path ends here
      if (before == field.status.key) {
        if (field instanceof ValueField) {
          return field.status.value;
        } else if (field instanceof FieldGroup) {
          return (field as FieldGroup).getValueByKey(after);
        } else if (field instanceof FieldLoop) {
          return (field as FieldLoop).getValueByKey(after);
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