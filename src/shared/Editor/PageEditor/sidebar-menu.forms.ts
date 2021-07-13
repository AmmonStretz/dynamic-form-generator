import { ParagraphConfig } from "@/shared/DynamicForm/Field/ContentFields/Paragraph/Paragraph.config";
import { RadioButtonListConfig } from "@/shared/DynamicForm/Field/ValueFields/RadioButtonList/RadioButtonList.config";
import { TextInputConfig } from "@/shared/DynamicForm/Field/ValueFields/TextInput/TextInput.config";
import { FormConfig } from "@/shared/DynamicForm/Form/Form.config";

export function addPageGenerator(listener: any) {
  const config = {
    form: new FormConfig(
      [
        new RadioButtonListConfig(
          'position',
          [{ name: 'vorher', value: 0 }, { name: 'nachher', value: 1 }],
          {}
        ),
        new TextInputConfig("title", { name: "Titel" }, [
        ]),
      ],
      { title: "Seite hinzufügen" }
    ),
    listener: listener
  }
  return config;
}

export function deletePageGenerator(listener: any) {
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
    settings: {confirmName: 'Löschen'}
  }
}

export function editPageGenerator(defaultCathegoryName: string, listener: any) {
  return {
    form: new FormConfig(
      [
        new TextInputConfig(
          "title",
          { name: "Titel", default: defaultCathegoryName },
          [
          ]
        ),
      ],
      { title: "Seite bearbeiten" }
    ),
    listener: listener,
  }
}