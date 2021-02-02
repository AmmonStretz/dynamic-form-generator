<template>
  <div class="number-input">
    <!-- start
    focus
    enter valid
    blur
    focus
    enter invalid
    blur => show Error
    focus => show Error
    enter valid
    blur
    end

    start
    focus
    enter invalid
    blur => show Error
    focus => show Error
    enter invalid => show Error
    enter valid
    blur
    end -->
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
    <span v-if="dto.config.unit">{{dto.config.unit}}</span><br>
    <div v-if="status.show && status.errors && status.errors[0]">{{status.errors[0].message}}</div>
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

  @Prop()
  public status: FieldStatus<number>;
  public $refs: any;

  mounted() {
    this.status.key = this.dto.key;
    if(this.dto.key in FinderService.values){
      this.status.value = FinderService.values[this.dto.key];
    } else if ("default" in this.dto.config) {
      this.status.value = this.dto.config.default;
    }
    // if(!!this.service){
    //   this.service.addSubmitListener(()=>{
    //     this.status.show = true;
    //     this.updateStatus();
    //   })
      
    // }
    this.updateStatus();
  }
  setFocus() {
    this.status.show = false;
    this.updateStatus();
  }

  setBlur() {    
    this.status.show = true;
    this.updateStatus();
  }

  @Emit("change")
  updateStatus(): FieldStatus<number> {
    this.status.errors = Validator.checkFieldValidity(this.status.value, this.dto.validators);
    this.status.isValid = this.status.errors.length == 0;
    // if(this.status.isValid){
      //   FinderService.values[this.dto.key] = this.status.value;
    // }
    return this.status;
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>
