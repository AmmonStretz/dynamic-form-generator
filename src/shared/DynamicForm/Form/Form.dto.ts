import { Field, FieldStatus } from '../Field/Field.dto';
import { FieldGroup, FieldGroupStatus } from '../Field/FieldGroup/FieldGroup.dto';
import { FieldLoop, FieldLoopStatus } from '../Field/FieldLoop/FieldLoop.dto';
import { ValueField, ValueFieldStatus } from '../Field/ValueFields/ValueField.dto';
import { BooleanObject } from '../math-logic/math-object.class';
import { BooleanConst } from '../math-logic/objects/boolean/const';
import { Wizzard } from '../Wizzard/Wizzard.dto';

export class FormStatus {
  constructor(
    public key: string,
    public isValid?: boolean,
    public visible: boolean = true,
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
      this.status = this.generateStatus();
    }
  }

  public generateStatus(): FormStatus {
    return new FormStatus(this.key)
  }

  public updateStatus(root: Wizzard): FieldStatus {
    
    let valide = true;
    for (let i = 0; i < this.fields.length; i++) {
      let childStatus;
      if (this.fields[i] instanceof ValueField) {
        childStatus = (this.fields[i] as ValueField<any>).updateStatus(root);
      }
      if (this.fields[i] instanceof FieldGroup) {
        childStatus = (this.fields[i] as FieldGroup).updateStatus(root);
      }
      if (this.fields[i] instanceof FieldLoop) {
        // (field.status as FieldLoop).groupAllValues(values);
        // TODO: 
      }
      if(!childStatus.isValid && childStatus.visible){
        valide = false;
      }
    }
    this.status.isValid = valide;
    this.status.visible = this.visible.calc((key: string)=>root.getStatusByKey(key));
    return this.status;
  }
  
  public groupAllValues(values: { [key: string]: any }) {
    // this.fields.forEach(field => {
    //   if (field.status instanceof ValueField) {
    //     (field.status as ValueField<any>).groupAllValues(values);
    //   }
    //   if (field.status instanceof FieldGroup) {
    //     (field.status as FieldGroup).groupAllValues(values);
    //   }
    //   if (field.status instanceof FieldLoop) {
    //     // (field.status as FieldLoop).groupAllValues(values);
    //     // TODO: 
    //   }
    // });
  }

  getStatusByKey(path: string): any {
    let before = path.split(/\.(.+)/)[0];
    let after = path.split(/\.(.+)/)[1];
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      if (before == field.status.key) {
        if (field instanceof ValueField) {
          return field.status;
        } else if (field instanceof FieldGroup) {
          return (field as FieldGroup).getStatusByKey(path.split(/\.(.+)/)[1]);
        } else if (field instanceof FieldLoopStatus) {
          return 'FieldLoopStatus'
        }
      }
    }
    return null;
  }

  public showAllErrors(): void {
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      if (field instanceof ValueField) {
        (field as ValueField<any>).showAllErrors();
      } else if (field instanceof FieldGroup) {
        (field as FieldGroup).showAllErrors();
      } else if (field instanceof FieldLoop) {
        // (status as FieldLoop).showAllErrors();
        // TODO: 
      }
    }
  }


  public toJson() {
    let fields: any[] = [];
    this.fields.forEach(field => {
      fields.push(field.toJson())
    })
    return {
      type: this.type,
      config: this.config,
      fields: fields,
      visible: this.visible.toJson()
    }
  }
}