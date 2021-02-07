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
          v-bind:root="dto"
          v-on:change="onChange"
          v-on:before="onBefore"
          v-on:after="onAfter"
          :ref="'form' + i"
        ></FormComponent>
      </div>
      <nav>
        <!-- <button v-on:click="cancel">
          {{ dto.config.prevButtonText ? dto.config.prevButtonText : "Zurück" }}
        </button>
        <button
          v-if="dto.forms.length - 1 <= currentStatus.index"
          v-on:click="next"
        >
          {{
            dto.config.submitButtonText ? dto.config.submitButtonText : "Fertig"
          }}
        </button>
        <button
          v-if="dto.forms.length - 1 > currentStatus.index"
          v-on:click="next"
        >
          {{ dto.config.nextButtonText ? dto.config.nextButtonText : "Weiter" }}
        </button> -->
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

  mounted() {}

  public get currentStatus() {
    return this.dto.status;
  }

  @Emit("change")
  onChange(status: FormStatus): WizzardStatus {
    this.dto.forms[this.dto.status.index].status = status;

    // console.log(this.status);

    // (this as any).$store.dispatch("changeStatus", this.status).then(()=>{
    //   setTimeout(()=>{
    //     console.log((this as any).$store.state.status.calcValue('checkboxKey'));
    //   },0)
    //   setTimeout(()=>{
    //     console.log((this as any).$store.state.status.calcValue('numberInputKey'));
    //   },0)
    // })

    return this.dto.status;
  }

  @Emit("submit")
  submit() {
    return this.dto.status;
  }

  onBefore() {
    if (this.dto.status.index > 0) {
      this.dto.status.index--;
      // TODO Multiple Steps back
    } else if (this.dto.status.index == 0) {
      // TODO: Cancel
    }
  }
  onAfter() {
    console.log(this.dto.status);
    if (this.dto.status.index < this.dto.forms.length - 1) {
      for (
        let i = this.dto.status.index + 1;
        i < this.dto.forms.length;
        i++
      ) {
        // RECALC Visibility
        if (this.dto.forms[i].status.visible) {
          this.dto.status.index = i;
          return;
        }
      }
    }
    this.submit();
  }
  // linkStatus(index: number) {
  //   const bla = this.status?.forms[index];
  //   let valide: any = false;
  //   if (bla) {
  //     valide = bla.isValid;
  //   }
  //   return {
  //     index,
  //     active: this.status?.index == index,
  //     enabled:
  //       index < this.status?.forms.length && this.status?.index != index,
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
