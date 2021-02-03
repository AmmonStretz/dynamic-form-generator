<template>
  <div class="wizzard">
    <!-- <nav>
      <ul>
        <li v-for="(form, i) in dto.forms" :key="i">
          <a
            :class="{
              active: linkStatus(i).active,
              valide: linkStatus(i).valide,
              enabled: linkStatus(i).enabled,
            }"
            >{{ form.config.title }} {{ linkStatus(i) }}</a
          >
        </li>
      </ul>
    </nav> -->
    <h1 v-if="!!dto.config && !!dto.config.title">{{ dto.config.title }}</h1>
    <div v-if="currentStatus">
      <div class="forms" v-for="(form, i) in dto.forms" :key="i">
        <FormComponent
          v-if="i == currentStatus.index"
          v-bind:dto="form"
          v-bind:status="status.values[i]"
          v-on:change="onChange"
          :ref="'form'+i"
        ></FormComponent>
      </div>
      <nav>
        <button v-on:click="cancel">
          {{dto.config.prevButtonText ? dto.config.prevButtonText : 'Zurück'}}
        </button>
        <button
          v-if="dto.forms.length - 1 <= currentStatus.index"
          v-on:click="submit"
        >
          {{dto.config.submitButtonText ? dto.config.submitButtonText : 'Fertig'}}
        </button>
        <button
          v-if="dto.forms.length - 1 > currentStatus.index"
          v-on:click="next"
        >
          {{dto.config.nextButtonText ? dto.config.nextButtonText : 'Weiter'}}
        </button>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import FormComponent from "../Form/Form.vue";
import { Wizzard, WizzardStatus } from "./Wizzard.dto";
import { FormStatus } from "../Form/Form.dto";

@Component({
  components: {
    FormComponent,
  },
})
export default class WizzardComponent extends Vue {

  @Prop() public dto!: Wizzard;
  public status: WizzardStatus = this.dto.generateStatus();

  mounted() {
    console.log(this.dto);
    
  }

  public get currentStatus() {
    return this.status;
  }

  @Emit("change")
  onChange(status: FormStatus): WizzardStatus {
    this.status.values[this.status.index] = status;
    return this.status;
  }

  next() {
    if (
      this.dto.forms[this.status.index].fields.length == 0 ||
      this.status.values[this.status.index].isValid
    ) {
      this.status.index++;
    } else {
      this.status.showErrorOfIndex();
    }
  }

  @Emit("submit")
  submit() {
    if (
      this.dto.forms[this.status.index].fields.length == 0 ||
      this.status.values[this.status.index].isValid
    ) {      
      return this.status;
      }
  }
  cancel(status: any) {
    if (this.status.index > 0) {
      this.status.index--;
    } else if (this.status.index == 0) {
    }
  }
  // linkStatus(index: number) {
  //   const bla = this.status?.values[index];
  //   let valide: any = false;
  //   if (bla) {
  //     valide = bla.isValid;
  //   }
  //   return {
  //     index,
  //     active: this.status?.index == index,
  //     enabled:
  //       index < this.status?.values.length && this.status?.index != index,
  //     valide,
  //   };
  // }
}
</script>

<style scoped lang="scss">
nav a {
  &.active {
    text-decoration: underline;
  }
  &.enabled {
    color: blue;
  }
}
</style>
