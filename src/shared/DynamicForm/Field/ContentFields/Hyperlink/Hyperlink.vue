<template>
  <div class="link-list">
    <a v-for="(link, index) of config.links" :key="index" class="link" :href="'//' + link.url">
      {{ link.text }}
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Wizzard } from "../../../Wizzard/Wizzard.config";
import { HyperlinkField } from "./Hyperlink.config";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {},
})
export default class HyperlinkFieldComponent extends Vue {
  @Prop() public config!: HyperlinkField;
  @Prop() public root!: Wizzard;
}
</script>

<style scoped lang="scss">
</style>
