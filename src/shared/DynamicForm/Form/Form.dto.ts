import { Field, FieldStatus } from '../Field/Field.dto';
import { FieldGroup, FieldGroupStatus } from '../Field/FieldGroup/FieldGroup.dto';
import { FieldLoop, FieldLoopStatus } from '../Field/FieldLoop/FieldLoop.dto';
import { ValueField, ValueFieldStatus } from '../Field/ValueFields/ValueField.dto';
import { BooleanObject } from '../math-logic/math-object.class';
import { BooleanConst } from '../math-logic/objects/boolean/const';

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
      const status = this.fields[i].status;
      if (status instanceof ValueField) {
        (status as ValueField<any>).showAllErrors();
      } else if (status instanceof FieldGroup) {
        (status as FieldGroup).showAllErrors();
      } else if (status instanceof FieldLoop) {
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