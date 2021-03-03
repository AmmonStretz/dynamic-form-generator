import { FieldSettings, FieldStatus } from '../Field.config';
import { Field } from '../Field.config';
import { BooleanObject, NumberObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { ValueField, ValueFieldSettings, ValueFieldStatus } from '../ValueFields/ValueField.config';
import { Wizzard } from '../../Wizzard/Wizzard.config';
import { FieldGroup, FieldGroupStatus } from '../FieldGroup/FieldGroup.config';
import { NumberConst } from '@/shared/Math/objects/number/const';
import { FieldParser } from '../Field.parser';
import { PluginService } from '../../services/Plugin.service';

export class FieldLoopStatus extends FieldStatus {

  public config: FieldLoop;
  constructor(
    public key: string,
    public isValid?: boolean,
    public isVisible: boolean = true,
  ) {
    super(key, isValid, isVisible);
  }
  public update(): FieldLoopStatus {
    this.config.updateFields()
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
    this.isVisible = this.config.visible.calc(this.getValueByKey);
    return this;
  }

  // TODO: Is parsing necessary 
  public showAllErrors(): void {
    this.children.forEach(child => {
      if (child instanceof ValueFieldStatus) {
        (child as ValueFieldStatus<any>).showAllErrors();
      } else if (child instanceof FieldLoopStatus) {
        (child as FieldLoopStatus).showAllErrors();
      } else if (child instanceof FieldGroupStatus) {
        (child as FieldGroupStatus).showAllErrors();
      }
    });
    return null;
  }
  
  getValueByKey(path: string): any {
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];

    if (current == 'Root:') {
      return this.config.root.status.getValueByKey(after);
    } else if (current == '..') {
      return this.parent.getValueByKey(after);
    } else if (+current != NaN && typeof +current == "number") {
      const index = +current;
      if (this.children.length > index && index >= 0) {
        if (this.children[index] instanceof ValueFieldStatus) {
          return (this.children[index] as ValueFieldStatus<any>).value;
        } else if (this.children[index] instanceof FieldLoopStatus) {
          return (this.children[index] as FieldLoopStatus).getValueByKey(after);
        } else if (this.children[index] instanceof FieldGroupStatus) {
          return (this.children[index] as FieldGroupStatus).getValueByKey(after);
        }
      }
    }
    if (current == 'length') {
      return this.config.fields.length;
    }
    return null;
  }
}

export interface FieldLoopSettings extends FieldSettings {
  title?: string,
  horizontal?: boolean;
  description?: string;
}

export class FieldLoop extends Field {

  public fields: Field[] = [];
  public status: FieldLoopStatus;

  constructor(
    public key: string,
    public field: Field,
    public settings: FieldLoopSettings,
    public visible: BooleanObject = new BooleanConst(true),
    public condition: NumberObject = new NumberConst(1)
  ) {
    super(
      'fieldLoop',
      key,
      settings,
      visible
    );
  }
  public createStatus() {
    // TODO: parent
    this.status = new FieldLoopStatus(
      this.key,
    )
    this.status.config = this;
  }

  public updateFields() {
    let newNumber = this.condition.calc((key) => this.status.getValueByKey(key));
    if (newNumber > this.fields.length) {
      while (newNumber > this.fields.length) {
        
        // console.log(JSON.stringify(this.field));
        // this.fields.push(FieldParser.parseFromJSON(JSON.parse(JSON.stringify(this.field))));
      }
    } else {
      this.fields = this.fields.splice(0, newNumber);
    }
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
      settings: this.settings,
      visible: this.visible,
    }
  }
}
