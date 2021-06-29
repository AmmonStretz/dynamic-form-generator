<template>
  <aside class="menu">
    <div class="content" v-if="config">
      <FormComponent :config="config.form" ref="a" />
      <button @click="validateSideMenu()">save</button>
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SidebarMenuConfig } from "./SidebarMenu.config";
import FormComponent from "../../DynamicForm/Form/Form.vue";
import { FormConfig } from "../../DynamicForm/Form/Form.config";

@Component({
  components: {
    FormComponent,
  },
})
export default class SidebarMenuComponent extends Vue {
  public config: SidebarMenuConfig = null;
  public $store: any;

  constructor() {
    super();
    console.log(this.$store);

    this.$store.commit("register", this.listener);
  }

  listener(config: SidebarMenuConfig) {
    config.form.createStatus();
    this.config = config;
    // this.$forceUpdate();
  }

  validateSideMenu() {
    // TODO: Validation & Error handling Close Menu
    this.config.form.status.showAllErrors();
    this.config.form.status.update();
    if (this.config.form.status.isValid || !this.config.form.status.visible) {
      this.config.listener(this.config.form.status);
      this.config = null;
    } else {
      this.config.form.status.showAllErrors();
    }
  }
}
</script>

<style scoped lang="scss">
aside.menu {
}
</style>
