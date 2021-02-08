import { FieldStatus } from './../Field.dto';
import { Field, FieldTypes } from '../Field.dto';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { FieldLoop, FieldLoopStatus } from '../FieldLoop/FieldLoop.dto';
import { ValueField, ValueFieldConfig, ValueFieldStatus } from '../ValueFields/ValueField.dto';
import { Wizzard } from '../../Wizzard/Wizzard.dto';

export class FieldGroupStatus extends FieldStatus {
  constructor(
    public key: string,
    public isValid?: boolean,
    public isVisible: boolean = true,
  ) {
    super(key, isValid, isVisible);
  }
}

export interface FieldGroupConfig extends ValueFieldConfig<{ [key: string]: any }> {
  title?: string,
  horizontal?: boolean;
  description?: string;
}

export class FieldGroup extends Field {
  constructor(
    public key: string,
    public fields: Field[],
    public config: FieldGroupConfig,
    public visible: BooleanObject = new BooleanConst(true),
    status?: FieldGroupStatus,
  ) {
    super(
      FieldTypes.FIELD_GROUP,
      config,
      visible,
      status ? status : new FieldGroupStatus(key)
    );
  }

  public updateStatus(root: Wizzard): FieldGroupStatus {
    let valide = true;
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      let childStatus: FieldStatus;
      if (field instanceof ValueField) {
        childStatus = (field as ValueField<any>).updateStatus(root);
      }
      if (field instanceof FieldGroup) {
        childStatus = (field as FieldGroup).updateStatus(root);
      }
      if (field instanceof FieldLoop) {
        // (field.status as FieldLoop).groupAllValues(values);
        // TODO: 
      }
      if (!childStatus.isValid && !!childStatus.isVisible) {
        valide = false;
      }
    }
    this.status.isValid = valide;
    this.status.isVisible = this.visible.calc(root.getStatusByKey);
    return this.status;
  }

  getStatusByKey(path: string): any {
    let before = path.split(/\.(.+)/)[0];
    let after = path.split(/\.(.+)/)[1];
    for (const key in this.fields) {
      if (Object.prototype.hasOwnProperty.call(this.fields, key)) {
        const field = this.fields[key];
        if (before == field.status.key) {
          if (field instanceof ValueField) {
            return field.status;
          } else if (field instanceof FieldGroup) {
            return field.getStatusByKey(after);
          } else if (field instanceof FieldLoopStatus) {
            return 'FieldLoopStatus'
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
      }
    });
  }

  public updateValidity() {
    this.fields.forEach(field => {
      if (field instanceof ValueFieldStatus) {
        if (!field.status.isVisible) {
          this.status.isValid = true;
        }
      } else if (field instanceof FieldGroup) {
        (field as FieldGroup).updateValidity();
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
      config: this.config,
      visible: this.visible,
    }
  }
}
