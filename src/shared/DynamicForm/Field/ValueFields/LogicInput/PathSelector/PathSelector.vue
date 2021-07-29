<template>
  <div class="path-selector">
    <button type="button" @click="isOpen = !isOpen">
      {{ selected.name ? selected.name : "leer" }}
    </button>
    <div class="selector-content" v-if="isOpen">
      <div class="additional-operations" v-if="additionalOperations">
        <div
          class="additional-operation"
          v-for="(additional, i) in additionalOperations"
          @click="change(additional)"
          :key="i"
        >
          {{ additional.name }}
        </div>
      </div>
      <SubPathSelector
        v-for="(subpath, j) in path.subpaths"
        :key="j"
        :path="subpath"
        @change="changeWithPath"
        :filter="filter"
        :ref="j"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Path } from "../../../../config";
import SubPathSelector from "./SubPathSelector.vue";

@Component({
  name: "PathSelector",
  components: {
    SubPathSelector,
  },
})
export default class PathSelector extends Vue {
  @Prop() public path: Path;
  @Prop() public value: { key?: string; type: string; value?: any };
  @Prop() public additionalOperations: {
    name: string;
    type: string;
    value: any;
  }[];
  @Prop() public filter: string;
  public $refs: any;
  public isOpen: boolean = false;
  public selected: any = {
    name: null,
    value: null,
    type: null,
  };

  mounted() {
    this.isOpen = false;
    if (this.value && this.value.key) {
      let selected = this.path.select(this.value.key);
      this.change({
        name: selected.name,
        value: this.value.key,
        type: selected.type,
      });
    } else if (this.value) {
      this.additionalOperations.forEach((additional) => {
        if (this.value.value == additional.value) {
          this.change(additional);
        }
      });
    }
  }
  @Emit("change")
  change(subpath: { name: string; value: string; type: string }): {
    name: string;
    value: string;
    type: string;
  } {
    this.selected = subpath;
    this.isOpen = false;
    return subpath;
  }
  @Emit("change")
  changeWithPath(subpath: { name: string; value: string; type: string }): {
    name: string;
    value: string;
    type: string;
  } {
    subpath.value = "Root:/" + subpath.value;
    this.selected = subpath;
    this.isOpen = false;
    return subpath;
  }
}
</script>

<style scoped lang="scss">
.path-selector {
  position: relative;
  button {
    padding: 10px;
    font-size: 18px;
    border: none;
    outline: none;
    border-radius: 4px;
  }
  & > .selector-content {
    padding: 8px;
    z-index: 100;
    position: absolute;
    background: white;
    text-align: left;
    .additional-operations {
      border-bottom: 1px solid black;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-block: 8px;
      .additional-operation {
        cursor: pointer;
        font-weight: bold;
        font-size: 1rem;
      }
    }
  }
}
</style>
