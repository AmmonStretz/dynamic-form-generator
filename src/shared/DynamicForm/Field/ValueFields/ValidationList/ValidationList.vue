<template>
  <div class="validation-list">
    <div v-for="(validator, i) in validators" :key="i">
      <select
        :id="'validator_' + i"
        @change="selected($event, i)"
        v-model.number="validators[i].id"
      >
        <option
          v-for="(option, index) of possibleValidators"
          :key="index"
          :value="index"
        >
          {{ option.name }}
        </option></select
      ><br />
      <input
        v-if="validator.plugin.type == 'number'"
        type="number"
        :id="'value_' + i"
        v-model.number="validators[i].value"
        placeholder="value"
        @change="change"
      /><br />
      <textarea
        :id="'message_' + i"
        v-model="validators[i].message"
        placeholder="Fehlermeldung"
        @change="change"
      />
    <button type="button" @click="removeValidator(i)"><img src="../../../../../assets/icons/delete.svg" alt="" /></button>
    </div>
    <button type="button" @click="addValidator">
        <img src="../../../../../assets/icons/add.svg" alt="" /></button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ValidatorPlugin } from "../../../Plugin/ValidatorPlugin";
import { PluginService } from "../../../services/Plugin.service";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.config";
import { ValidationListConfig } from "./ValidationList.config";

@Component({
  name: "ValidationListComponent",
})
export default class ValidationListComponent extends Vue {
  @Prop() private config!: ValidationListConfig;
  public $refs: any;
  public validators: {
    id: number;
    plugin: ValidatorPlugin;
    value: any;
    message: string;
  }[] = [];
  public possibleValidators: ValidatorPlugin[] = [];

  mounted() {
    this.possibleValidators = [];
    for (const key in PluginService.validators) {
      if (Object.prototype.hasOwnProperty.call(PluginService.validators, key)) {
        const element = PluginService.validators[key];
        if (element.type == this.config.validationType || element.type == "any") {
          this.possibleValidators.push(element);
        }
      }
    }
    if(this.config.settings.default){

      this.config.settings.default.forEach((validator) => {
        for (let i = 0; i < this.possibleValidators.length; i++) {
          if (this.possibleValidators[i].name == validator.type) {
            this.validators.push({
              id: i,
            plugin: this.possibleValidators[i],
            value: (validator as any).value,
            message: validator.message,
          });
        }
      }
    });
            }
    this.change();
  }

  addValidator() {
    this.validators.push({
      id: 0,
      plugin: this.possibleValidators[0],
      message: this.possibleValidators[0].defaultMessage,
      value: this.possibleValidators[0].defaultValue,
    });
    this.change();
  }
  removeValidator(i: number) {
    this.validators.splice(i, 1);
    this.change();
  }

  selected(a: any, i: number) {
    this.validators[i].plugin = this.possibleValidators[a.target.value];
    this.validators[i].value = this.possibleValidators[i].defaultValue; //TODO: FIX default == 0
    this.validators[i].message = this.possibleValidators[i].defaultMessage;
    this.change();
  }

  parseValidators() {
    this.config.status.value = [];
    this.validators.forEach((validator) => {
      this.config.status.value.push(
        validator.plugin.parser(validator.message, validator.value)
      );
    });
  }

  @Emit("change")
  change(): ValueFieldStatus<Validator<any>[]> {
    this.parseValidators();
    this.config.status.errors = Validator.checkFieldValidity(
      this.config.status.value,
      this.config.validators
    );
    this.config.status.isValid = this.config.status.errors.length == 0;
    return this.config.status;
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>
