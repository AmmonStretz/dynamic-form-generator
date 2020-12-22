<template>
  <div class="number-input">
    <label v-if="dto.config && dto.config.name" :for="dto.key">{{dto.config.name}}</label>
    <input
      v-if="status"
      type="number"
      ref="input"
      :id="dto.key"
      :placeholder="dto.config.placeholder"
      v-model.number="status.value"
      @focus="setFocus()"
      @blur="setBlur()"
      :class="{'show': status.show, 'valid': status.isValid}"
    />
    <span v-if="dto.config.unit">{{dto.config.unit}}</span>
    <br>
    <p if="dto.config.description">{{dto.config.description}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { NumberInput } from "./NumberInput.dto";
import { Validator } from "../../Validators/validators.class";
import { FormService } from '../../services/Form.service';
import { FinderService } from '../../services/Finder.service';
import { FieldStatus } from '../Field.dto';

@Component({
  name: 'NumberInputComponent'
})
export default class NumberInputComponent extends Vue {
  @Prop() private dto!: NumberInput;
  @Prop() public service!: FormService;

  public status: FieldStatus<number> = {
    key: null,
    value: null,
    show: false
  }
  public $refs: any;

  mounted() {
    this.status.key = this.dto.key;
    if(this.dto.key in FinderService.values){
      this.status.value = FinderService.values[this.dto.key];
    } else if ("default" in this.dto.config) {
      this.status.value = this.dto.config.default;
    }
    if(!!this.service){
      this.service.addSubmitListener(()=>{
        this.status.show = true;
        this.updateStatus();
      })
      
    }
    this.updateStatus();
  }
  @Watch("value")
  valueChanged(newVal: any) {
    this.updateStatus();
  }
  setFocus() {
    this.updateStatus();
  }

  setBlur() {
    this.status.show = true;
    this.updateStatus();
  }

  @Emit("change")
  updateStatus() {
    this.status.errors = Validator.checkFieldValidity(this.status.value, this.dto.validators);
    this.status.isValid = this.status.errors.length == 0;
    if(this.status.isValid){
      FinderService.values[this.dto.key] = this.status.value;
    }
    return this.status;
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>
