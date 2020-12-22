<template>
  <div class="text">{{dto.text}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { NumberInput } from "./../NumberInput/NumberInput.dto";
import { Validator } from "../../Validators/validators.class";

@Component({
  name: 'TextFieldComponent'
})
export default class TextFieldComponent extends Vue {
  @Prop() private dto!: NumberInput;
}
</script>

<style scoped lang="scss">
</style>
