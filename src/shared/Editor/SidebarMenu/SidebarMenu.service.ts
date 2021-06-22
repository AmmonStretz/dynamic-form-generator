import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import { SidebarMenuConfig } from './SidebarMenu.config';

@Module({ namespaced: false, name: 'sidebar-menu-service' })
class SidbarMenuService extends VuexModule {
  private listener: (config: SidebarMenuConfig)=>void

  @Mutation
  public openMenu(config: SidebarMenuConfig): void {
    if(!!this.listener) this.listener(config);
  }

  @Mutation
  public register(listener: (config: SidebarMenuConfig)=>void) {
    this.listener = listener;
  }
}

export default SidbarMenuService;