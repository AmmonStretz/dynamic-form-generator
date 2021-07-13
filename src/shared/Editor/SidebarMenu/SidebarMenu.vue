<template>
  <aside class="menu">
    <div class="content" v-if="config">
      <FormComponent :config="config.form" ref="a" />
      <button @click="closeSideMenu()">{{closeName}}</button>
      <button @click="validateSideMenu()">{{confirmName}}</button>
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SidebarMenuConfig } from "./SidebarMenu.config";
import FormComponent from "../../DynamicForm/Form/Form.vue";

@Component({
  components: {
    FormComponent,
  },
})
export default class SidebarMenuComponent extends Vue {
  public config: SidebarMenuConfig = null;
  public $store: any;

  get confirmName(): string {
    return !!this?.config?.settings?.confirmName?this.config.settings.confirmName: 'Speichern';
  }
  get closeName(): string {
    return !!this?.config?.settings?.closeName?this.config.settings.closeName: 'Abbruch';
  }

  constructor() {
    super();
    this.$store.commit("register", this.listener);
  }

  listener(config: SidebarMenuConfig) {
    config.form.createStatus();
    this.config = config;
  }
  closeSideMenu() {
    this.config = null;
  }

  validateSideMenu() {
    // TODO: Validation & Error handling Close Menu
    this.config.form.status.update(true);
    if (this.config.form.status.isValid || !this.config.form.status.visible) {
      this.config.listener(this.config.form.status);
      this.config = null;
    } else {
      this.config.form.status.update(true);
    }
  }
}
</script>

<style scoped lang="scss">
aside.menu {
}
</style>
