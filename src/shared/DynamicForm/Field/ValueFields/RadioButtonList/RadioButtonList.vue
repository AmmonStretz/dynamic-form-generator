<template>
  <div class="number-input">
    <label v-if="dto.config && dto.config.name" :for="dto.key">
      {{ dto.config.name }}
    </label>
    <div v-for="(option, index) of dto.options" :key="'i' + index">
      <input
        type="radio"
        :id="_uid + option.value"
        v-model.number="dto.status.value"
        :value="option.value"
        @change="updateStatus()"
      />
      <label :for="_uid + option.value">{{ option.name }}</label
      ><br />
    </div>
    <div
      v-if="dto.status.showErrors && dto.status.errors && dto.status.errors[0]"
    >
      {{ dto.status.errors[0].message }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { RadioButtonList } from "./RadioButtonList.dto";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.dto";

@Component({
  name: "RadioButtonListComponent",
})
export default class RadioButtonListComponent extends Vue {
  @Prop() private dto!: RadioButtonList;

  public $refs: any;

  mounted() {
    this.dto.status.key = this.dto.key;
    if(this.dto.config.default){
      this.dto.status.value = this.dto.config.default
    }
    this.updateStatus();
  }

  setBlur() {
    this.dto.status.showErrors = true;
    this.updateStatus();
  }

  @Emit("change")
  updateStatus(): ValueFieldStatus<number> {
    this.dto.status.errors = Validator.checkFieldValidity(
      this.dto.status.value,
      this.dto.validators
    );
    this.dto.status.isValid = this.dto.status.errors.length == 0;
    return this.dto.status;
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>
