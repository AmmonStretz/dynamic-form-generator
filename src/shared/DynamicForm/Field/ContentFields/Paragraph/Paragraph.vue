<template>
  <p class="paragraph">
    {{config.text}}
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { WizardConfig } from "../../../Wizard/Wizard.config";
import { ParagraphFieldConfig } from "./Paragraph.config";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {},
})
export default class ParagraphFieldComponent extends Vue {
  @Prop() private config!: ParagraphFieldConfig;
  @Prop() public root!: WizardConfig;
}
</script>

<style scoped lang="scss">
</style>
