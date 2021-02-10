<template>
  <p class="paragraph">
    {{dto.text}}
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Wizzard } from "../../../Wizzard/Wizzard.dto";
import { ParagraphField } from "./Paragraph.dto";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {},
})
export default class ParagraphFieldComponent extends Vue {
  @Prop() private dto!: ParagraphField;
  @Prop() public root!: Wizzard;
}
</script>

<style scoped lang="scss">
</style>
