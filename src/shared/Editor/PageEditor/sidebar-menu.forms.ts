import { ParagraphFieldConfig } from "@/shared/DynamicForm/Field/ContentFields/Paragraph/Paragraph.config";
import RadioButtonList from "@/shared/DynamicForm/Field/ValueFields/RadioButtonList";
import { RadioButtonListConfig } from "@/shared/DynamicForm/Field/ValueFields/RadioButtonList/RadioButtonList.config";
import { TextInputConfig } from "@/shared/DynamicForm/Field/ValueFields/TextInput/TextInput.config";
import { FormConfig } from "@/shared/DynamicForm/Form/Form.config";
import { NotInList, Required } from "@/shared/DynamicForm/Validators";

export function addPageGenerator(listener: any) {
  const config = {
    form: new FormConfig(
      [
        new RadioButtonListConfig(
          'position',
          [{ name: 'vorher', value: 0 }, { name: 'nacher', value: 1 }],
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
        new ParagraphFieldConfig(
          "Möchten Sie diese Seite wirklich löschen?",
          {}
        ),
      ],
      { title: "Seite löschen" }
    ),
    listener: listener,
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
      { title: "Seite Bearbeiten" }
    ),
    listener: listener,
  }
}