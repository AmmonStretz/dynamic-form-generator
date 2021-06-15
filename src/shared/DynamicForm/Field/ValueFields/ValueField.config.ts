import { BooleanCondition } from "@/shared/ts-condition-parser/condition.class";
import { Validator } from "../../Validators";
import { FieldConfig, FieldSettings, FieldStatus } from "../Field.config";

export interface ValueFieldSettings<T> extends FieldSettings {
  default?: T,
}

export class ValueFieldStatus<T> extends FieldStatus {
  public config: ValueFieldConfig<T>;
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

  public update(): FieldStatus {
    this.isVisible = this.config.visible.calc((key: string) => this.getValueByKey(key));
    return this;
  }

  public showAllErrors(): void {
    this.showErrors = true;
  }
  
  getValueByKey(path: string): any {
      let current = path.split(/\/(.+)/)[0];
      let after = path.split(/\/(.+)/)[1];
      after = after?after:'';
      // console.log('ValueField', path, 123);
      
      // return null;
      if (current == 'Root:') {
        return this.config.root.status.getValueByKey(after);
      } else if (current == '..') {
        return this.parent.getValueByKey(after);
      } else if (current == '') {
        return this.value;
      }
      return null;
    }
}

export abstract class ValueFieldConfig<T> extends FieldConfig {

  public status: ValueFieldStatus<T>;
  constructor(
    public key: string,
    public type: string,
    public settings: ValueFieldSettings<T>,
    public validators: Validator<T>[] = [],
    public visible: BooleanCondition,
  ) {
    super(type, key, settings, visible);
  }

  abstract toJson(): any;
}