import { BooleanObject } from '@/shared/Math/math-object.class';
import { Wizzard } from '../Wizzard/Wizzard.dto';
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
  constructor(
    public type: string,
    public key: string,
    public config: FieldConfig,
    public visible: BooleanObject,
    public status: FieldStatus,
  ) { }

  public abstract updateStatus(root: Wizzard): FieldStatus;

  abstract toJson(): any;
}