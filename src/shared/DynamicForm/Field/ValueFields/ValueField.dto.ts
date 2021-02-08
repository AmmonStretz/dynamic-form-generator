import { BooleanObject } from "@/shared/Math/math-object.class";
import { Validator } from "../../Validators";
import { Wizzard } from "../../Wizzard/Wizzard.dto";
import { Field, FieldConfig, FieldStatus, FieldTypes } from "../Field.dto";

export interface ValueFieldConfig<T> extends FieldConfig {
  default?: T,
}

export class ValueFieldStatus<T> extends FieldStatus {
  constructor(
    public key: string,
    public value: T,
    public isValid?: boolean,
    public showErrors?: boolean,
    public errors?: { message: string, type: string }[],
    public isVisible: boolean = true,
  ) {
    super(key, isValid, isVisible);
  }

  public showAllErrors(): void {
    this.showErrors = true;
  }
}

export abstract class ValueField<T> extends Field {

  constructor(
    public key: string,
    public type: FieldTypes,
    public config: ValueFieldConfig<T>,
    public validators: Validator<T>[] = [],
    public visible: BooleanObject,
    public status: ValueFieldStatus<T>
  ) {
    super(type, config, visible, status);
  }
  
  public showAllErrors(){
    this.status.showErrors = true;
  }

  public updateStatus(root: Wizzard): FieldStatus {
    this.status.isVisible = this.visible.calc((key: string)=>root.getStatusByKey(key));
    return this.status;
  }

  abstract toJson(): any;
}