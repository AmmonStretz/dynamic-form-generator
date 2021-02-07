<template>
  <div class="field-group">
    <h1>TEST</h1>
    <div>
      {{fields}}
      <div v-for="index in dto.condition.calc(values)" :key="index">
        {{dto.field}}
        <p>   </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { FieldLoop, FieldLoopStatus } from "./FieldLoop.dto";
import { Validator } from "../../Validators/validators.class";
import { FieldStatus } from '../Field.dto';
import { Wizzard, WizzardStatus } from "../../Wizzard/Wizzard.dto";

@Component({
  name: 'FieldLoopComponent'
})
export default class FieldLoopComponent extends Vue {
  @Prop() private dto!: FieldLoop;

  @Prop()
  public status: FieldLoopStatus;
  public $refs: any;
  @Prop()
  public values!: { [key: string]: any };
  @Prop() public root!: Wizzard;

  mounted() {
    this.updateStatus();
  }

  get fields(): FieldStatus {
    console.log(this.dto.generateStatusByValues(this.root));
    return null;
  }

  // setFocus() {
  //   this.status.showErrors = false;
  //   this.updateStatus();
  // }

  // setBlur() {    
  //   this.status.showErrors = true;
  //   this.updateStatus();
  // }

  @Emit("change")
  updateStatus(): FieldLoopStatus {
    return this.status;
    // this.status.errors = Validator.checkFieldValidity(this.status.value, this.dto.validators);
    // this.status.isValid = this.status.errors.length == 0;
    // return this.status;
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>
