<template>
  <div class="content-field" v-if="visibility">
    <component
      v-if="plugin.length > 0"
      :is="plugin[0].component.name"
      v-bind:config="config"
      v-bind:root="root"
    ></component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { ContentFieldConfig } from "./ContentField.config";
import ParagraphFieldComponent from "./Paragraph/Paragraph.vue";
import HyperlinkFieldComponent from "./Hyperlink/Hyperlink.vue";
import { FinderConfig } from "../../Finder/Finder.config";
@Component({
  name: "FieldComponent",
  components: {
    ParagraphFieldComponent,
    HyperlinkFieldComponent,
  },
})
export default class ContentFieldComponent extends Vue {
  @Prop() private config!: ContentFieldConfig;

  @Prop() public root!: FinderConfig;

  get plugin() {
    return (Vue as any).fieldPlugins.filter(
      (plugin: any) =>
        plugin.type == "contentField" && plugin.key == this.config.type
    );
  }

  get visibility(): any {
    if (this.config.visible.calc) {
      this.config.status.visible = this.config.visible.calc((key) =>
        this.config.status.getValueByKey(key)
      );
      return this.config.status.visible;
    }
    return true;
  }
}
</script>

<style scoped lang="scss">
</style>
