import { Path } from "@/shared/DynamicForm/config";
import { ParagraphConfig } from "@/shared/DynamicForm/Field/ContentFields/Paragraph/Paragraph.config";
import { FieldConfig } from "@/shared/DynamicForm/Field/Field.config";
import { FieldGroupConfig } from "@/shared/DynamicForm/Field/FieldGroup/FieldGroup.config";
import { NumberLogicInputConfig } from "@/shared/DynamicForm/Field/ValueFields/LogicInput/NumberLogicInput/NumberLogicInput.config";
import { RadioButtonListConfig } from "@/shared/DynamicForm/Field/ValueFields/RadioButtonList/RadioButtonList.config";
import { SelectConfig } from "@/shared/DynamicForm/Field/ValueFields/Select/Select.config";
import { TextInputConfig } from "@/shared/DynamicForm/Field/ValueFields/TextInput/TextInput.config";
import { FormConfig } from "@/shared/DynamicForm/Form/Form.config";
import { Status } from "@/shared/DynamicForm/status";
import { Equal } from "@/shared/ts-condition-parser/objects/boolean.class";
import { NumberConst, NumberVar } from "@/shared/ts-condition-parser/objects/number.class";

import { Vue } from "vue-property-decorator";

export function addFieldGenerator(listener: any, positions: { name: string, value: number }[]) {

  // generate Dropdown
  let selectOptions: { name: string, value: number }[] = [];
  // generate Plugin Fields
  let fields: FieldConfig[] = [];

  (Vue as any).fieldPlugins.forEach((plugin: any, index: number) => {
    if (!!plugin.editor && plugin.isPublic) {
      selectOptions.push({ name: plugin.key, value: index })
      let form: any = plugin.editor.form();
      form.visible = new Equal(new NumberConst(index), new NumberVar('../../type'))
      fields.push(form)
    }
  });


  // TODO: dynamicaly generate Groups for every Plugin
  // new Equal(new NumberConst(index), new NumberVar('../type'))
  return {
    form: new FormConfig(
      positions.length > 0 ? [
        new RadioButtonListConfig(
          'position',
          positions,
          { default: 0 }
        ),
        new SelectConfig('type', selectOptions, { default: 0 }),
        new FieldGroupConfig('config', fields, {})
      ] : [
        new SelectConfig('type', selectOptions, { default: 0 }),
        new FieldGroupConfig('config', fields, {})
      ],
      { title: "Feld hinzufügen" }
    ),
    listener: listener
  }
}
export function addFieldLoopGenerator(listener: any, paths: Path) {

  return {
    form: new FormConfig(
      [
        new TextInputConfig('key', {name: 'Schlüssel'}),
        new NumberLogicInputConfig("counter", paths, {}),
        new ParagraphConfig(
          "Bei Bestätigung wird das ausgewählte Feld wieerholt in Abhängigkeit zu einem Ausgewählten Feld/ festen Eingabewert.",
          {}
        ),
      ],
      { title: "Wiederholung hinzufügen" }
    ),
    listener: listener
  }
}

export function editFieldLoopGenerator(currentField: FieldConfig, listener: any) {
  // generate Dropdown

  let selectOptions: { name: string, value: number }[] = [];
  let selectSettings: any = {}
  // generate Plugin Fields
  let fields: FieldConfig[] = [];
  (Vue as any).fieldPlugins.forEach((plugin: any, index: number) => {
    let group = plugin.editor.form();
    if (!!plugin.editor && plugin.isPublic) {
      if (currentField.type === plugin.key) {
        selectSettings['default'] = index;
        if (!!plugin.editor.fill) {
          group = plugin.editor.fill(currentField, group);
        }
      }
      selectOptions.push({ name: plugin.key, value: index })
      group.visible = new Equal(new NumberConst(index), new NumberVar('../../type'))
      fields.push(group)
    }
  });

  // TODO: dynamicaly generate Groups for every Plugin
  // new Equal(new NumberConst(index), new NumberVar('../type'))
  const config = {
    form: new FormConfig(
      [
        new SelectConfig('type', selectOptions, selectSettings),
        new FieldGroupConfig('config', fields, {})
      ],
      { title: "Feld bearbeiten" }
    ),
    listener: (status: Status) => {
      const currentStatus = status.children[1].children[status.getValueByKey('type')];
      let field = (Vue as any).fieldPlugins[status.getValueByKey('type')];
      listener(field.editor.generator(currentStatus));
    }
  }
  config.form.createStatus();
  config.form.status.update(true)
  return config;
}

export function deleteFieldGenerator(listener: any) {
  return {
    form: new FormConfig(
      [
        new ParagraphConfig(
          "Möchten Sie dieses Feld wirklich löschen?",
          {}
        ),
      ],
      { title: "Feld löschen" }
    ),
    listener: listener,
    settings: { confirmName: 'Löschen' }
  }
}

export function editFieldGenerator(currentField: FieldConfig, listener: any) {
  // generate Dropdown

  let selectOptions: { name: string, value: number }[] = [];
  let selectSettings: any = {}
  // generate Plugin Fields
  let fields: FieldConfig[] = [];
  (Vue as any).fieldPlugins.forEach((plugin: any, index: number) => {
    let group = plugin.editor.form();
    if (!!plugin.editor && plugin.isPublic) {
      if (currentField.type === plugin.key) {
        selectSettings['default'] = index;
        if (!!plugin.editor.fill) {
          group = plugin.editor.fill(currentField, group);
        }
      }
      selectOptions.push({ name: plugin.key, value: index })
      group.visible = new Equal(new NumberConst(index), new NumberVar('../../type'))
      fields.push(group)
    }
  });

  // TODO: dynamicaly generate Groups for every Plugin
  // new Equal(new NumberConst(index), new NumberVar('../type'))
  const config = {
    form: new FormConfig(
      [
        new SelectConfig('type', selectOptions, selectSettings),
        new FieldGroupConfig('config', fields, {})
      ],
      { title: "Feld bearbeiten" }
    ),
    listener: (status: Status) => {
      const currentStatus = status.children[1].children[status.getValueByKey('type')];
      let field = (Vue as any).fieldPlugins[status.getValueByKey('type')];
      listener(field.editor.generator(currentStatus));
    }
  }
  config.form.createStatus();
  config.form.status.update(true)
  return config;
}