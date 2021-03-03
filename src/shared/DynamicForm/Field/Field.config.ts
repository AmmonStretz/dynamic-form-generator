import { BooleanObject } from '@/shared/Math/math-object.class';
import { FormConfig } from '../Form/Form.config';
import { Config, Status, WizzardConfig } from '../Wizzard/Wizzard.config';
import { FieldGroupConfig } from './FieldGroup/FieldGroup.config';
// import { ValueField } from "./ValueFields/ValueField.dto";
// import { FieldGroupStatus } from './FieldGroup/FieldGroup.dto';

export abstract class FieldStatus extends Status {
  constructor(
    public key: string,
    public isValid?: boolean,
    public isVisible: boolean = true,
  ) {
    super();
  }
  public showAllErrors(): void {}
}

export interface FieldSettings{
  placeholder?: string,
  question?: string,
  description?: string,
  name?: string
}

export abstract class FieldConfig extends Config{

  public parent: FormConfig | FieldGroupConfig;
  public status: FieldStatus;
  constructor(
    public type: string,
    public key: string,
    public settings: FieldSettings,
    public visible: BooleanObject
  ) {
    super();
  }

  get root(): WizzardConfig {
    return this.parent.root;
  }

  abstract toJson(): any;
}