import { BooleanObject } from '@/shared/Math/math-object.class';
import { Form } from '../Form/Form.config';
import { Config, Status, Wizzard } from '../Wizzard/Wizzard.config';
import { FieldGroup } from './FieldGroup/FieldGroup.config';
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
}

export interface FieldSettings{
  placeholder?: string,
  question?: string,
  description?: string,
  name?: string
}

export abstract class Field extends Config{

  public parent: Form | FieldGroup;
  public status: FieldStatus;
  constructor(
    public type: string,
    public key: string,
    public settings: FieldSettings,
    public visible: BooleanObject
  ) {
    super();
  }

  public abstract getValueByKey(path: string): any;

  get root(): Wizzard {
    return this.parent.root;
  }

  public abstract updateStatus(): FieldStatus;

  abstract toJson(): any;
}