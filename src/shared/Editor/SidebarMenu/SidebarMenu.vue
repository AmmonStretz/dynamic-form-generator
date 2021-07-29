<template>
  <aside class="menu">
    <div class="content" v-if="config && status">
      <Form :config="config.form" :status="status" ref="a" />
      <button @click="closeSideMenu()">{{closeName}}</button>
      <button @click="validateSideMenu()">{{confirmName}}</button>
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SidebarMenuConfig } from "./SidebarMenu.config";
import Form from "../../DynamicForm/Form/Form.vue";
import { FormStatus } from "../../DynamicForm/Form/Form.config";

@Component({
  name: 'SidebarMenu',
  components: {
    Form,
  },
})
export default class SidebarMenu extends Vue {
  public config: SidebarMenuConfig = null;
  public status!: FormStatus;
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
    if(!config.form.status){
      config.form.createStatus();
      config.form.status.update();
    }
    this.status = config.form.status;
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
  padding: 0 1rem;
}
</style>
