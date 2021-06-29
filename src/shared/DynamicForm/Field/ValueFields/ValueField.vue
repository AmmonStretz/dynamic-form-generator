<template>
  <div class="value-field">
    <component
      v-if="plugin.length > 0"
      :is="plugin[0].component.name"
      v-bind:config="config"
      @change="onChange"
    ></component>
    <div v-if="plugin.length == 0">
      Fehler: Diese Komponente kann aufgrund eines Versionsunterschieds nicht
      angezeigt werden!
    </div>
    <p if="config.settings.description">{{ config.settings.description }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import NumberInputComponent from "./NumberInput/NumberInput.vue";
import TextInputComponent from "./TextInput/TextInput.vue";
import TextAreaComponent from "./TextArea/TextArea.vue";
import NumberRangeComponent from "./NumberRange/NumberRange.vue";
import CheckboxComponent from "./Checkbox/Checkbox.vue";
import SelectComponent from "./Select/Select.vue";
import RadioButtonListComponent from "./RadioButtonList/RadioButtonList.vue";
import { ValueFieldStatus, ValueFieldConfig } from "./ValueField.config";
import { FinderConfig } from "../../Finder/Finder.config";
import { PluginService } from "../../services/Plugin.service";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {
    NumberInputComponent,
    TextInputComponent,
    TextAreaComponent,
    NumberRangeComponent,
    CheckboxComponent,
    SelectComponent,
    RadioButtonListComponent,
  },
})
export default class FieldComponent extends Vue {
  @Prop() private config!: ValueFieldConfig<any>;
  @Prop() public root!: FinderConfig;

  get visibility(): any {
    if (this.config.visible.calc) {
      this.config.status.visible = this.config.visible.calc((key) =>
        this.config.status.getValueByKey(key)
      );
      return this.config.status.visible;
    }
    return true;
  }

  get plugin() {
    return (Vue as any).fieldPlugins.filter(
      (plugin: any) =>
        plugin.type == "valueField" && plugin.key == this.config.type
    );
  }

  @Emit("change")
  onChange(status: ValueFieldStatus<any>): ValueFieldStatus<any> {
    //this.config.Root.status.update();
    return status;
  }
}
</script>

<style scoped lang="scss">
</style>
