import { BooleanObject } from '../math-logic/math-object.class';
import { Wizzard } from '../Wizzard/Wizzard.dto';
// import { FieldGroupStatus } from './FieldGroup/FieldGroup.dto';

export enum FieldTypes {
  CHECKBOX = 'checkbox',
  FIELD_GROUP = 'fieldGroup',
  FIELD_LOOP = 'fieldLoop',
  NUMBER_INPUT = 'numberInput',
  TEXT_INPUT = 'textInput',
  NUMBER_RANGE = 'numberRange',
  SELECT = 'select'
}

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
  constructor(
    public type: FieldTypes,
    public config: FieldConfig,
    public visible: BooleanObject,
    public status: FieldStatus,
  ) { }

  public abstract updateStatus(root: Wizzard): FieldStatus;

  abstract toJson(): any;
}