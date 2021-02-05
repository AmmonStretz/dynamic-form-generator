<template>
  <div class="text">{{dto.text}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, } from "vue-property-decorator";
import { TextField } from "../TextField/TextField.dto";

@Component({
  name: 'TextFieldComponent'
})
export default class TextFieldComponent extends Vue {
  @Prop() private dto!: TextField;
}
</script>

<style scoped lang="scss">
</style>
