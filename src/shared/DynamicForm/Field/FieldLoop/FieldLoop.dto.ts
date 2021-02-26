import { FieldConfig, FieldStatus } from './../Field.dto';
import { Field } from '../Field.dto';
import { BooleanObject, NumberObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { ValueField, ValueFieldConfig, ValueFieldStatus } from '../ValueFields/ValueField.dto';
import { Wizzard } from '../../Wizzard/Wizzard.dto';
import { FieldGroup } from '../FieldGroup/FieldGroup.dto';
import { NumberConst } from '@/shared/Math/objects/number/const';
import { FieldParser } from '../Field.parser';
import { PluginService } from '../../services/Plugin.service';

export class FieldLoopStatus extends FieldStatus {
  constructor(
    public key: string,
    public isValid?: boolean,
    public isVisible: boolean = true,
  ) {
    super(key, isValid, isVisible);
  }
}

export interface FieldLoopConfig extends FieldConfig {
  title?: string,
  horizontal?: boolean;
  description?: string;
}

export class FieldLoop extends Field {

  public fields: Field[] = [];

  constructor(
    public key: string,
    public field: Field,
    public config: FieldLoopConfig,
    public visible: BooleanObject = new BooleanConst(true),
    public condition: NumberObject = new NumberConst(1),
    status?: FieldLoopStatus,
  ) {
    super(
      'fieldLoop',
      key,
      config,
      visible,
      status ? status : new FieldLoopStatus(key)
    );
  }

  public updateFields() {
    let newNumber = this.condition.calc((key) => this.getValueByKey(key));
    if (newNumber > this.fields.length) {
      while (newNumber > this.fields.length) {
        
        // console.log(JSON.stringify(this.field));
        // this.fields.push(FieldParser.parseFromJSON(JSON.parse(JSON.stringify(this.field))));
      }
    } else {
      this.fields = this.fields.splice(0, newNumber);
    }
  }

  public updateStatus(): FieldLoopStatus {
    this.updateFields()
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

    if (current == 'Root:') {
      return this.root.getValueByKey(after);
    } else if (current == '..') {
      return this.parent.getValueByKey(after);
    } else if (+current != NaN && typeof +current == "number") {
      const index = +current;
      if (this.fields.length > index && index >= 0) {
        if (this.fields[index] instanceof ValueField) {
          return (this.fields[index] as ValueField<any>).status.value;
        } else if (this.fields[index] instanceof FieldLoop) {
          return (this.fields[index] as FieldLoop).getValueByKey(after);
        } else if (this.fields[index] instanceof FieldGroup) {
          return (this.fields[index] as FieldGroup).getValueByKey(after);
        }
      }
    }
    if (current == 'length') {
      return this.fields.length;
    }
    return null;
  }

  public showAllErrors(): void {
    this.fields.forEach(field => {
      if (field instanceof ValueField) {
        (field as ValueField<any>).showAllErrors();
      } else if (field instanceof FieldLoop) {
        (field as FieldLoop).showAllErrors();
      } else if (field instanceof FieldGroup) {
        (field as FieldGroup).showAllErrors();
      }
    });
    return null;
  }

  public updateValidity() {
    if (this.field instanceof ValueField) {
      if (!this.field.status.isVisible) {
        this.status.isValid = true;
      }
    } else if (this.field instanceof FieldGroup) {
      (this.field as FieldGroup).updateValidity();
      if (!this.field.visible) {
        this.status.isValid = true;
      }
    } else if (this.field instanceof FieldLoop) {
      (this.field as FieldLoop).updateValidity();
      if (!this.field.visible) {
        this.status.isValid = true;
      }
    }
  }

  public toJson() {

    return {
      type: this.type,
      field: this.field,
      config: this.config,
      visible: this.visible,
    }
  }
}
