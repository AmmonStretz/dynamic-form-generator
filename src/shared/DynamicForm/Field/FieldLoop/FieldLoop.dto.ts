import { FieldStatus, FieldConfig, Field } from './../Field.dto';
import { FieldTypes } from '../Field.dto';
import { Validator } from '../../Validators/validators.class';
import { BooleanObject, NumberObject } from '../../math-logic/math-object.class';
import { BooleanConst } from '../../math-logic/objects/boolean/const';
import { NumberConst } from '../../math-logic/objects/number/const';
import { FieldGroup } from '../FieldGroup/FieldGroup.dto';
import { Wizzard, WizzardStatus } from '../../Wizzard/Wizzard.dto';
import { ValueField } from '../ValueFields/ValueField.dto';

export class FieldLoopStatus extends FieldStatus {
  constructor(
    public key: string,
    public isValid?: boolean,
  ) {
    super(key, isValid, true); //TODO: VISIBLE
  }
  public groupAllValues(values: {[key: string]: any}) {
    // console.log('groupAllValues');
    // for (const key in this.fields) {
    //   if (Object.prototype.hasOwnProperty.call(this.fields, key)) {
    //     if (this.fields[key] instanceof ValueFieldStatus) {
    //       (this.fields[key] as ValueFieldStatus<any>).groupAllValues(values);
    //     } else if (this.fields[key] instanceof FieldLoopStatus) {
    //       (this.fields[key] as ValueFieldStatus<any>).groupAllValues(values);
    //     }
    //   }
    // }
  }

  public showAllErrors(): void {
    // console.log('showErrors');
    
    // for (const key in this.fields) {
    //   if (Object.prototype.hasOwnProperty.call(this.fields, key)) {
    //     if (this.fields[key] instanceof ValueFieldStatus) {
    //       (this.fields[key] as ValueFieldStatus<any>).showAllErrors();
    //     } else if (this.fields[key] instanceof FieldLoopStatus) {
    //       (this.fields[key] as ValueFieldStatus<any>).showAllErrors();
    //     }
    //   }
    // }
  }
}

export interface FieldLoopConfig extends FieldConfig {
  unit?: string
}

export class FieldLoop extends Field {
  constructor(
    public key: string,
    public field: Field,
    public config: FieldLoopConfig,
    public visible: BooleanObject = new BooleanConst(true),
    public condition: NumberObject = new NumberConst(1),
    status?: FieldLoopStatus,
  ) {
    super(FieldTypes.FIELD_LOOP, config, visible, status? status: new FieldLoopStatus(key));
  }

  public generateStatusByValues(root: Wizzard) {
    // const status = this.generateStatus();
    // for (let i = 0; i < this.condition.calc(root.getStatusByKey); i++) {
    //   if (this.field instanceof ValueField) {
    //     status.fields.push(this.field.generateStatus());
    //   } else if (this.field instanceof FieldGroup) {
    //     status.fields.push(this.field.generateStatus());
    //   } else if (this.field instanceof FieldLoop) {
    //     status.fields.push(this.field.generateStatus());
    //   }
    // }
    // return status;
  }

  public generateStatus(): FieldLoopStatus {
    // console.log('generateStatus');
    //TODO: fill Fields inside LoopComponent
    return new FieldLoopStatus(
      this.key,
    )
    // return new ValueFieldStatus<number>(
    //   this.key,
    //   this.config.default? this.config.default: null,
    // )
  }

  public toJson() {
    return {
      type: this.type,
      key: this.key,
      config: this.config,
      visible: this.visible.toJson(),
      condition: this.condition.toJson(),
    }
  }
}
