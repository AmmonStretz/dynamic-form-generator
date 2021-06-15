<template>
  <div class="content-field" v-if="visibility">
    <ParagraphFieldComponent
      v-if="config.type == 'paragraph'"
      v-bind:config="config"
      v-bind:root="root"
    >
    </ParagraphFieldComponent>
    <HyperlinkFieldComponent
      v-if="config.type == 'hyperlink'"
      v-bind:config="config"
      v-bind:root="root"
    >
    </HyperlinkFieldComponent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { WizardConfig } from "../../Wizard/Wizard.config";
import { ContentFieldConfig } from "./ContentField.config";
import ParagraphFieldComponent from "./Paragraph/Paragraph.vue";
import HyperlinkFieldComponent from "./Hyperlink/Hyperlink.vue";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {
    ParagraphFieldComponent,
    HyperlinkFieldComponent,
  },
})
export default class ContentFieldComponent extends Vue {
  @Prop() private config!: ContentFieldConfig;

  @Prop() public root!: WizardConfig;

  get visibility(): any {
    if (this.config.visible.calc) {
      this.config.status.isVisible = this.config.visible.calc((key) =>
        this.config.status.getValueByKey(key)
      );
      return this.config.status.isVisible;
    }
    return true;
  }
}
</script>

<style scoped lang="scss">
</style>
