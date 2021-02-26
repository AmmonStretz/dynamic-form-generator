import { BooleanObject } from "@/shared/Math/math-object.class";
import { Validator } from "../../Validators";
import { Wizzard } from "../../Wizzard/Wizzard.dto";
import { Field, FieldConfig, FieldStatus } from "../Field.dto";

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
    public type: string,
    public config: ValueFieldConfig<T>,
    public validators: Validator<T>[] = [],
    public visible: BooleanObject,
    public status: ValueFieldStatus<T>
  ) {
    super(type, key, config, visible, status);
  }

  public showAllErrors() {
    this.status.showAllErrors();
  }

  
  getValueByKey(path: string): any {
      let current = path.split(/\/(.+)/)[0];
      let after = path.split(/\/(.+)/)[1];
      after = after?after:'';
      if (current == 'Root:') {
        return this.root.getValueByKey(after);
      } else if (current == '..') {
        return this.parent.getValueByKey(after);
      } else if (current == '') {        
        return this.status;
      }
      return null;
    }

  public updateStatus(): FieldStatus {
    this.status.isVisible = this.visible.calc((key: string) => this.getValueByKey(key));
    return this.status;
  }

  abstract toJson(): any;
}