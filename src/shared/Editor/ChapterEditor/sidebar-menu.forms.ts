import { ParagraphFieldConfig } from "@/shared/DynamicForm/Field/ContentFields/Paragraph/Paragraph.config";
import { RadioButtonListConfig } from "@/shared/DynamicForm/Field/ValueFields/RadioButtonList/RadioButtonList.config";
import { TextInputConfig } from "@/shared/DynamicForm/Field/ValueFields/TextInput/TextInput.config";
import { FormConfig } from "@/shared/DynamicForm/Form/Form.config";
import { NotInList, Required } from "@/shared/DynamicForm/Validators";

export function editCathegoryGenerator(defaultCathegoryName: string, blockedTitles: string[], listener: any) {
  return {
    form: new FormConfig(
      [
        new TextInputConfig(
          "name",
          { name: "Kapitelname", default: defaultCathegoryName },
          [
            new Required("Bitte geben Sie einen Namen ein"),
            new NotInList("Diese Kategorie gibt es schon", blockedTitles),
          ]
        ),
      ],
      { title: "Kategorie bearbeiten" }
    ),
    listener: listener,
  }
}

export function deleteCathegoryGenerator(listener: any) {
  return {
    form: new FormConfig(
      [
        new ParagraphFieldConfig(
          "Möchten Sie diese Kategorie wirklich löschen?",
          {}
        ),
      ],
      { title: "Kategorie löschen" }
    ),
    listener: listener,
    settings: {confirmName: 'Löschen'}
  }
}
export function addCathegoryGenerator(defaultCathegoryName: string, blockedTitles: string[], listener: any, isRoot: boolean) {
  
  const config = {
    form: new FormConfig(
      [
        new TextInputConfig("title", { name: "Kapitelname" }, [
          new Required("Bitte geben Sie einen Namen ein"),
          new NotInList("Diese Kategorie gibt es schon", blockedTitles),
        ]),
      ],
      { title: "Kategorie hinzufügen" }
    ),
    listener: listener
  }
  if(!isRoot) {
    config.form.fields.unshift(new RadioButtonListConfig(
      'position',
      [{name: 'vorher', value: 0}, {name: 'als Unterkategorie', value: 1}, {name: 'nachher', value: 2}],
      {}
    ))
  }
  return config;
}