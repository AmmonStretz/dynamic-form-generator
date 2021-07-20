import { ParagraphConfig } from "@/shared/DynamicForm/Field/ContentFields/Paragraph/Paragraph.config";
import { FieldConfig } from "@/shared/DynamicForm/Field/Field.config";
import { FieldGroupConfig } from "@/shared/DynamicForm/Field/FieldGroup/FieldGroup.config";
import { SelectConfig } from "@/shared/DynamicForm/Field/ValueFields/Select/Select.config";
import { FormConfig } from "@/shared/DynamicForm/Form/Form.config";
import { Status } from "@/shared/DynamicForm/status";
import { Equal } from "@/shared/ts-condition-parser/objects/boolean.class";
import { NumberConst, NumberVar } from "@/shared/ts-condition-parser/objects/number.class";

import { Vue } from "vue-property-decorator";
import { config } from "vuex-module-decorators";

export function addFieldGenerator(listener: any) {

  // generate Dropdown
  let selectOptions: {name: string, value: number}[] = [];
  // generate Plugin Fields
  let fields: FieldConfig[] = [];
  
  (Vue as any).fieldPlugins.forEach((plugin: any, index: number) => {
    if(!!plugin.editor && plugin.isPublic){
      selectOptions.push({name: plugin.key, value: index})
      plugin.editor.form.visible = new Equal(new NumberConst(index), new NumberVar('../../type'))
      fields.push(plugin.editor.form)
    }
  });
  
  // TODO: dynamicaly generate Groups for every Plugin
  // new Equal(new NumberConst(index), new NumberVar('../type'))
  const config = {
    form: new FormConfig(
      [
        new SelectConfig('type', selectOptions, {default: 0}),
        new FieldGroupConfig('config', fields,{})
      ],
      { title: "Feld hinzufügen" }
    ),
    listener: (status: Status)=>{
      const currentStatus = status.children[1].children[status.getValueByKey('type')];
      
      let field = (Vue as any).fieldPlugins[status.getValueByKey('type')];
      listener(field.editor.generator(currentStatus));
    }
  }
  
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
    settings: {confirmName: 'Löschen'}
  }
}

export function editFieldGenerator(currentField: FieldConfig, listener: any) {
  // generate Dropdown
  
  let selectOptions: {name: string, value: number}[] = [];
  let selectSettings: any = {}
  // generate Plugin Fields
  let fields: FieldConfig[] = [];
  (Vue as any).fieldPlugins.forEach((plugin: any, index: number) => {
    let group = plugin.editor.form;
    if(!!plugin.editor && plugin.isPublic){
      if(currentField.type === plugin.key){
        selectSettings['default'] = index;
        if(!!plugin.editor.fill) {
          group = plugin.editor.fill(currentField, group);
        }
      }
      selectOptions.push({name: plugin.key, value: index})
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
        new FieldGroupConfig('config', fields,{})
      ],
      { title: "Feld bearbeiten" }
    ),
    listener: (status: Status)=>{
      const currentStatus = status.children[1].children[status.getValueByKey('type')];
      let field = (Vue as any).fieldPlugins[status.getValueByKey('type')];
      listener(field.editor.generator(currentStatus));
    }
  }
  config.form.createStatus();
  config.form.status.update(true)
  console.log(config.form.status)
  return config;
}