import { BooleanObject } from '../math-logic/math-object.class';
import { Validator } from '../Validators/validators.class';

export enum FieldTypes {
  CHECKBOX = 'checkbox',
  FIELD_GROUP = 'fieldGroup',
  NUMBER_INPUT = 'numberInput',
  NUMBER_RANGE = 'numberRange',
  TEXT_FIELD = 'textField',
  SELECT = 'select'
}

export class FieldStatus<T> {
  constructor(
    public key: string,
    public value: T,
    public isValid?: boolean,
    public showErrors?: boolean,
    public errors?: { message: string, type: string }[],
    public visible: boolean = true,
  ) { }

  public showAllErrors(): void {
    this.showErrors = true;
  }
}

export interface FieldConfig {
  placeholder?: string,
  question?: string,
  description?: string,
  name?: string
}
export interface ValueFieldConfig<T> extends FieldConfig {
  default?: T,
}

export abstract class Field {

  constructor(
    public type: FieldTypes,
    public config: FieldConfig,
    public visible: BooleanObject,
  ) { }

  abstract toJson(): any;
}
export abstract class ValueField<T> extends Field {

  constructor(
    public key: string,
    public type: FieldTypes,
    public config: ValueFieldConfig<T>,
    public validators: Validator<T>[] = [],
    public visible: BooleanObject,
  ) {
    super(type, config, visible);
  }

  abstract generateStatus(): FieldStatus<T>;

  abstract toJson(): any;
}