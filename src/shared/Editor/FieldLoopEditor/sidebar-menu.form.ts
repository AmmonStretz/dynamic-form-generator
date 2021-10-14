
// export function addFieldLoopGenerator(listener: any, paths: Path) {

import { Path } from "@/shared/DynamicForm/config";
import { ParagraphConfig } from "@/shared/DynamicForm/Field/ContentFields/Paragraph/Paragraph.config";
import { FieldConfig } from "@/shared/DynamicForm/Field/Field.config";
import { FieldGroupConfig } from "@/shared/DynamicForm/Field/FieldGroup/FieldGroup.config";
import { FieldLoopConfig } from "@/shared/DynamicForm/Field/FieldLoop/FieldLoop.config";
import { NumberLogicInputConfig } from "@/shared/DynamicForm/Field/ValueFields/LogicInput/NumberLogicInput/NumberLogicInput.config";
import { SelectConfig } from "@/shared/DynamicForm/Field/ValueFields/Select/Select.config";
import { TextInputConfig } from "@/shared/DynamicForm/Field/ValueFields/TextInput/TextInput.config";
import { FormConfig } from "@/shared/DynamicForm/Form/Form.config";
import { Status } from "@/shared/DynamicForm/status";
import { Equal } from "@/shared/ts-condition-parser/objects/boolean.class";
import { NumberConst, NumberVar } from "@/shared/ts-condition-parser/objects/number.class";
import Vue from "vue";

export function editFieldLoopGenerator(currentField: FieldLoopConfig, listener: any, paths: Path) {
  return {
    form: new FormConfig(
      [
        new TextInputConfig('key', {name: 'Schlüssel', default: currentField.key}),
        new NumberLogicInputConfig("counter", paths, {default: currentField.condition}),
      ],
      { title: "Wiederholung hinzufügen" }
    ),
    listener: listener
  }
}