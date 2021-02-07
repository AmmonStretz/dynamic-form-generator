import { BooleanObject } from '../math-logic/math-object.class';
import { Validator } from '../Validators/validators.class';
import { Wizzard } from '../Wizzard/Wizzard.dto';
import { FieldGroup } from './FieldGroup/FieldGroup.dto';
import { FieldLoop } from './FieldLoop/FieldLoop.dto';
import { ValueField } from './ValueFields/ValueField.dto';
// import { FieldGroupStatus } from './FieldGroup/FieldGroup.dto';

export enum FieldTypes {
  CHECKBOX = 'checkbox',
  FIELD_GROUP = 'fieldGroup',
  FIELD_LOOP = 'fieldLoop',
  NUMBER_INPUT = 'numberInput',
  TEXT_INPUT = 'textInput',
  NUMBER_RANGE = 'numberRange',
  TEXT_FIELD = 'textField',
  SELECT = 'select'
}

export class FieldStatus {
  constructor(
    public key: string,
    public isValid?: boolean,
    public visible: boolean = true,
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