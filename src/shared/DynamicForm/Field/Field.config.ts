import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { Config } from '../config';
import { FinderConfig } from '../Finder/Finder.config';
import { FormConfig } from '../Form/Form.config';
import { Status } from '../status';
import { FieldGroupConfig } from './FieldGroup/FieldGroup.config';

export abstract class FieldStatus extends Status {
  constructor(
    public key: string,
    public isValid?: boolean,
    public visible: boolean = true,
  ) {
    super();
  }
}

export interface FieldSettings{
  placeholder?: string,
  description?: string,
  name?: string
}

export abstract class FieldConfig extends Config{

  declare public parent: FormConfig | FieldGroupConfig;
  declare public status: FieldStatus;
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