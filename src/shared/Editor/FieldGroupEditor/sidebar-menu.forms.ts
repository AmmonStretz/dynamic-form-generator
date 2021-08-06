import { ParagraphConfig } from "@/shared/DynamicForm/Field/ContentFields/Paragraph/Paragraph.config";
import { RadioButtonListConfig } from "@/shared/DynamicForm/Field/ValueFields/RadioButtonList/RadioButtonList.config";
import { TextInputConfig } from "@/shared/DynamicForm/Field/ValueFields/TextInput/TextInput.config";
import { FormConfig } from "@/shared/DynamicForm/Form/Form.config";

export function addFieldGroupGenerator(listener: any) {
  return {
    form: new FormConfig(
      [
        new TextInputConfig(
          "key",
          { name: "Schlüssel" },
          [
          ]
        ),
        new TextInputConfig(
          "title",
          { name: "Titel" },
          [
          ]
        ),
      ],
      { title: "Gruppe bearbeiten" }
    ),
    listener: listener,
  }
}

export function deleteFieldGroupGenerator(listener: any) {
  return {
    form: new FormConfig(
      [
        new ParagraphConfig(
          "Möchten Sie diese Seite wirklich löschen?",
          {}
        ),
      ],
      { title: "Seite löschen" }
    ),
    listener: listener,
    settings: { confirmName: 'Löschen' }
  }
}

export function editFieldGroupGenerator(defaultCathegoryName: string, listener: any) {
  return {
    form: new FormConfig(
      [
        new TextInputConfig(
          "key",
          { name: "Schlüssel" },
          [
          ]
        ),
        new TextInputConfig(
          "title",
          { name: "Titel", default: defaultCathegoryName },
          [
          ]
        ),
      ],
      { title: "Gruppe bearbeiten" }
    ),
    listener: listener,
  }
}