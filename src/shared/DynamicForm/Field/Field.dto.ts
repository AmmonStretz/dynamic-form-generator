// import NumberInput from './NumberInput/dto.class';
import { Validator } from '../Validators/validators.class';

export enum FieldTypes {
  CHECKBOX= 'checkbox',
  FIELD_GROUP= 'fieldGroup',
  NUMBER_INPUT = 'numberInput',
  NUMBER_RANGE = 'numberRange',
  TEXT_FIELD = 'textField'
}

export interface FieldStatus<T> {
  key: string,
  value: T,
  isValid?: boolean,
  show?: boolean,
  errors?: {message: string, type: string}[],
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
    public config?: FieldConfig,
  ) { }

  abstract toJson(): any;
}
export abstract class ValueField<T> extends Field {

  constructor(
    public type: FieldTypes,
    public config?: ValueFieldConfig<T>,
    public validators: Validator<T>[] = [],
  ) {
    super(type, config);
  }

  abstract toJson(): any;
}