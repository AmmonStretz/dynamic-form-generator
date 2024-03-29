import { ParagraphConfig } from "@/shared/DynamicForm/Field/ContentFields/Paragraph/Paragraph.config";
import { CheckboxConfig } from "@/shared/DynamicForm/Field/ValueFields/Checkbox/Checkbox.config";
import { RadioButtonListConfig } from "@/shared/DynamicForm/Field/ValueFields/RadioButtonList/RadioButtonList.config";
import { TextInputConfig } from "@/shared/DynamicForm/Field/ValueFields/TextInput/TextInput.config";
import { FormConfig } from "@/shared/DynamicForm/Form/Form.config";
import { Required } from "@/shared/DynamicForm/Validators/any/Required.validator";
import { NotInList } from "@/shared/DynamicForm/Validators/string/NotInList.validator";

export function editCathegoryGenerator(defaultCathegoryName: string, showTitle: boolean, blockedTitles: string[], listener: any) {
  return {
    form: new FormConfig(
      [
        new TextInputConfig(
          "title",
          { name: "Kapitelname", default: defaultCathegoryName },
          [
            new Required("Bitte geben Sie einen Namen ein"),
            // new NotInList("Diese Kategorie gibt es schon", blockedTitles), TODO:
          ]
        ),
        new CheckboxConfig(
          'showTitle',
          { default: showTitle, name: 'Titel anzeigen?' }
        )
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
        new ParagraphConfig(
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
          new NotInList("Dieses Kapitel gibt es schon", blockedTitles),
        ]),
        new CheckboxConfig(
          'showTitle',
          { default: true, name: 'Titel anzeigen?' }
        )
      ],
      { title: "Kapitel hinzufügen" }
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