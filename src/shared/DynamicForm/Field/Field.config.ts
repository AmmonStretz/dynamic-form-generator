import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { Config } from '../config';
import { FinderConfig } from '../Finder/Finder.config';
import { FormConfig } from '../Form/Form.config';
import { Status } from '../status';
import { FieldGroupConfig } from './FieldGroup/FieldGroup.config';
// import { ValueField } from "./ValueFields/ValueField.dto";
// import { FieldGroupStatus } from './FieldGroup/FieldGroup.dto';

export abstract class FieldStatus extends Status {
  constructor(
    public key: string,
    public isValid?: boolean,
    public visible: boolean = true,
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
    public visible: BooleanCondition
  ) {
    super();
  }

  get root(): FinderConfig {
    return this.parent.root;
  }

  abstract toJson(): any;
}