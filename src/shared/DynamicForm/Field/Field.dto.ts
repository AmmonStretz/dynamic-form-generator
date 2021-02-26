import { BooleanObject } from '@/shared/Math/math-object.class';
import { Form } from '../Form/Form.dto';
import { Wizzard } from '../Wizzard/Wizzard.dto';
import { FieldGroup } from './FieldGroup/FieldGroup.dto';
// import { ValueField } from "./ValueFields/ValueField.dto";
// import { FieldGroupStatus } from './FieldGroup/FieldGroup.dto';

export class FieldStatus {
  constructor(
    public key: string,
    public isValid?: boolean,
    public isVisible: boolean = true,
  ) { }
}

export interface FieldConfig {
  placeholder?: string,
  question?: string,
  description?: string,
  name?: string
}

export abstract class Field {

  public parent: Form | FieldGroup;
  constructor(
    public type: string,
    public key: string,
    public config: FieldConfig,
    public visible: BooleanObject,
    public status: FieldStatus,
  ) { }

  public abstract getValueByKey(path: string): any;

  get root(): Wizzard {
    return this.parent.root;
  }

  public abstract updateStatus(): FieldStatus;

  abstract toJson(): any;
}