<template>
  <div class="value-field">
    <component
      v-if="plugin.length > 0"
      :is="plugin[0].component.name"
      :config="config"
      :status = "currentStatus"
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
import { ValueFieldStatus, ValueFieldConfig } from "./ValueField.config";
import { FinderConfig } from "../../Finder/Finder.config";
@Component({
  name: "ValueField",
  components: {},
})
export default class ValueField extends Vue {
  @Prop() private config!: ValueFieldConfig<any>;
  @Prop() public status!: ValueFieldStatus<any>;
  @Prop() public root!: FinderConfig;

  public set currentStatus(status: ValueFieldStatus<any>) {
    this.status = status;
  }
  public get currentStatus(): ValueFieldStatus<any> {
    return this.status;
  }

  get plugin() {
    return (Vue as any).fieldPlugins.filter(
      (plugin: any) =>
        plugin.type == "valueField" && plugin.key == this.config.type
    );
  }

  @Emit("change")
  onChange(status: ValueFieldStatus<any>): ValueFieldStatus<any> {
    return status;
  }
}
</script>

<style scoped lang="scss">
</style>
