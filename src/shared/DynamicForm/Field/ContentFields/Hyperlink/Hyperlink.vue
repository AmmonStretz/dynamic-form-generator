<template>
  <div class="link-list">
    <a v-for="(link, index) of dto.links" :key="index" class="link" :href="'//' + link.url">
      {{ link.text }}
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Wizzard } from "../../../Wizzard/Wizzard.dto";
import { HyperlinkField } from "./Hyperlink.dto";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {},
})
export default class HyperlinkFieldComponent extends Vue {
  @Prop() public dto!: HyperlinkField;
  @Prop() public root!: Wizzard;
}
</script>

<style scoped lang="scss">
</style>
