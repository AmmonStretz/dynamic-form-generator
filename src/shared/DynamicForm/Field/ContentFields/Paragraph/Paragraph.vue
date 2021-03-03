<template>
  <p class="paragraph">
    {{config.text}}
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Wizzard } from "../../../Wizzard/Wizzard.config";
import { ParagraphField } from "./Paragraph.config";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {},
})
export default class ParagraphFieldComponent extends Vue {
  @Prop() private config!: ParagraphField;
  @Prop() public root!: Wizzard;
}
</script>

<style scoped lang="scss">
</style>
