<template>
  <div class="number-range">
    <label v-if="dto.config && dto.config.name" :for="dto.key">{{dto.config.name}}</label>
    <input
      type="range"
      ref="input"
      :id="dto.key"
      :placeholder="dto.config.placeholder"
      v-model.number="value"
      @focus="setFocus()"
      @blur="setBlur()"
      :class="{'show': show, 'valid': valid}"
      :min="dto.config.min"
      :max="dto.config.max"
      :step="dto.config.step"
    />
    {{value}}
    <span class="unit" v-if="!!dto.config.unit">{{dto.config.unit}}</span>
    
    <br>
    <p if="dto.config.description">{{dto.config.description}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { NumberRange } from "./NumberRange.dto";
import { Validator } from "../../Validators/validators.class";
import { FormService } from '../../services/Form.service';
import { FinderService } from '../../services/Finder.service';

@Component({
  name: 'NumberRangeComponent'
})
export default class NumberRangeComponent extends Vue {

  @Prop() private dto!: NumberRange;
  @Prop() public service!: FormService;
  
  public value: any = null;
  public show: boolean = false;
  public valid: boolean = false;
  public $refs: any;

  mounted() {
    if(this.dto.key in FinderService.values){
      console.log(FinderService.values[this.dto.key]);
      
      this.value = FinderService.values[this.dto.key];
    } else if ("default" in this.dto.config) {
      this.value = this.dto.config.default;
    } else {
      this.value = this.dto.config.min;
    }
    if(!!this.service){
      this.service.addSubmitListener(()=>{
        this.show = true;
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
    this.show = true;
    this.updateStatus();
  }

  @Emit("change")
  updateStatus() {
    let errors = Validator.checkFieldValidity(this.value, this.dto.validators);
    this.valid = errors.length == 0;
    if(this.valid){
      FinderService.values[this.dto.key] = this.value;
    }
    return {
      key: this.dto.key,
      value: this.value,
      isValid: this.valid,
      show: this.show,
      errors,
    };
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>
