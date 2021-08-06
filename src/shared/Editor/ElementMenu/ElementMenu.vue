<template>
  <div class="element-menu">
    <div>
      <button v-if="!!listeners.add" @click="click('add')">
        <img src="../../../assets/icons/add.svg" />
      </button>
      <nav class="submenu" v-if="open == 'add'">
        <button v-for="(add, a) in listeners.add" :key="a" @click="open = null;add.click()">
          {{ add.name }}
        </button>
      </nav>
    </div>
    <div>
      <button v-if="!!listeners.edit" @click="click('edit')">
        <img src="../../../assets/icons/settings.svg" />
      </button>
      <nav class="submenu" v-if="open == 'edit'">
        <button v-for="(edit, a) in listeners.edit" :key="a" @click="open = null;edit.click()">
          {{ edit.name }}
        </button>
      </nav>
    </div>
    <div>
      <button v-if="!!listeners.delete" @click="click('delete')">
        <img src="../../../assets/icons/delete.svg" />
      </button>
      <nav class="submenu" v-if="open == 'delete'">
        <button v-for="(deleteButton, a) in listeners.delete" :key="a" @click="open = null;deleteButton.click()">
          {{ deleteButton.name }}
        </button>
      </nav>
    </div>
    <div>
      <button v-if="!!listeners.visibility" @click="click('visibility')">
        <img src="../../../assets/icons/visibility.svg" />
      </button>
      <nav class="submenu" v-if="open == 'visibility'">
        <button v-for="(visibility, a) in listeners.visibility" :key="a" @click="open = null;visibility.click()">
          {{ visibility.name }}
        </button>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component({
  name: "ElementMenu",
  components: {},
})
export default class ElementMenu extends Vue {
  @Prop() listeners: {
    [key: string]: { name: string; click: () => void }[];
  };
  public open: string = null;
  click(name: string) {
    if (this.listeners[name].length == 1) {
      this.listeners[name][0].click();
      this.open = null;
    } else if (this.listeners[name].length > 1) {
      this.open = this.open != name?name: null;
    }
  }
}
</script>

<style scoped lang="scss">
.element-menu {
  display: flex;
  gap: 8px;
  div {
    position: relative;
    &>nav {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: left;
      gap: 8px;
      padding-top: 8px;
    }
  }
  button {
    border: none;
    padding: 10px;
    border-radius: 5px;
    background-color: #eee;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
    }
    img {
      display: block;
    }
  }
}
</style>
