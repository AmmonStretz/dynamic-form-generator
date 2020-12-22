// import NumberInput from './NumberInput/dto.class';
import { Validator } from '../Validators/validators.class';

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

  public type!: string;

  constructor(
    public config?: FieldConfig,
  ) { }

  abstract toJson(): any;
}
export abstract class ValueField<T> extends Field {

  public type!: string;

  constructor(
    public config?: ValueFieldConfig<T>,
    public validators: Validator<T>[] = [],
  ) {
    super();
  }

  abstract toJson(): any;
}