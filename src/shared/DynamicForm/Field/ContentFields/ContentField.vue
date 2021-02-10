<template>
  <div class="content-field" v-if="visibility">
    <ParagraphFieldComponent
      v-if="dto.type == 'paragraph'"
      v-bind:dto="dto"
      v-bind:root="root"
    >
    </ParagraphFieldComponent>
    <HyperlinkFieldComponent
      v-if="dto.type == 'hyperlink'"
      v-bind:dto="dto"
      v-bind:root="root"
    >
    </HyperlinkFieldComponent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Wizzard } from "../../Wizzard/Wizzard.dto";
import { ContentField } from "./ContentField.dto";
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
  @Prop() private dto!: ContentField;

  @Prop() public root!: Wizzard;

  get visibility(): any {
    if (this.dto.visible.calc) {
      this.dto.status.isVisible = this.dto.visible.calc((key) =>
        this.root.getValueByKey(key)
      );
      return this.dto.status.isVisible;
    }
    return true;
  }
}
</script>

<style scoped lang="scss">
</style>
