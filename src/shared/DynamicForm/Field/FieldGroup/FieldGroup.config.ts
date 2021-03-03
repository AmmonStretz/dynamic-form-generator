import { FieldStatus } from '../Field.config';
import { FieldConfig } from '../Field.config';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { FieldLoopConfig, FieldLoopStatus } from '../FieldLoop/FieldLoop.config';
import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueFields/ValueField.config';
import { WizzardConfig } from '../../Wizzard/Wizzard.config';
import { ContentFieldConfig, ContentFieldStatus } from '../ContentFields/ContentField.config';

export class FieldGroupStatus extends FieldStatus {
  public config: FieldGroupConfig;
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
    this.isVisible = this.config.visible.calc(this
    .getValueByKey);
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
  getValueByKey(path: string): any {
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    after = after?after:'';
    // TODO: if path ends here
    if (current == 'Root:') {
      return this.config.root.status.getValueByKey(after);
    } else if (current == '..') {
      return this.parent.getValueByKey(after);
    } else {
      for (const key in this.children) {
        if (Object.prototype.hasOwnProperty.call(this.children, key)) {
          const child = this.children[key];
          if (child instanceof FieldStatus && current == child.key) {
            if (child instanceof ContentFieldStatus) {
              return (child as ContentFieldStatus).getValueByKey(after);
            } else if (child instanceof ValueFieldStatus) {
              return (child as ValueFieldStatus<any>).getValueByKey(after);
            } else if (child instanceof FieldGroupStatus) {
              return (child as FieldGroupStatus).getValueByKey(after);
            } else if (child instanceof FieldLoopStatus) {
              return (child as FieldLoopStatus).getValueByKey(after);
            }
          }
        }
      }
    }
    return null;
  }
}

export interface FieldGroupSettings extends ValueFieldSettings<{ [key: string]: any }> {
  title?: string,
  horizontal?: boolean;
  description?: string;
}

export class FieldGroupConfig extends FieldConfig {

  public status: FieldGroupStatus;
  constructor(
    public key: string,
    public fields: FieldConfig[],
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

  public updateValidity() {
    this.fields.forEach(field => {
      if (field instanceof ValueFieldConfig) {
        if (!field.status.isVisible) {
          this.status.isValid = true;
        }
      } else if (field instanceof FieldGroupConfig) {
        (field as FieldGroupConfig).updateValidity();
        if (!field.visible) {
          this.status.isValid = true;
        }
      } else if (field instanceof FieldLoopConfig) {
        (field as FieldLoopConfig).updateValidity();
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