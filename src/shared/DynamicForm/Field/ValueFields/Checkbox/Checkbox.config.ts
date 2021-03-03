import { Validator } from '../../../Validators/validators.class';
import { BooleanConst } from '@/shared/Math/objects/boolean/const';
import { BooleanObject } from '@/shared/Math/math-object.class';
import { ValueField, ValueFieldSettings, ValueFieldStatus } from '../ValueField.config';

export class Checkbox extends ValueField<boolean> {
  constructor(
    public key: string,
    public settings: ValueFieldSettings<boolean>,
    public validators: Validator<boolean>[] = [],
    public visible: BooleanObject = new BooleanConst(true),
    status?: ValueFieldStatus<boolean>,
  ) {
    super(
      key,
      'checkbox',
      settings,
      validators,
      visible
    );
  }

  public createStatus() {
    this.status = new ValueFieldStatus<boolean>(
      this.key,
      !!this.settings.default
    )
    this.status.config = this;
  }

  public toJson() {
    return {
      type: this.type,
      key: this.key,
      settings: this.settings,
      validators: this.validators.map(val => val.toJson())
    }
  }
}
