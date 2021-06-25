import Vue from 'vue';
import Vuex from 'vuex';
import ConfigDragDrop from './dragdrop';
import SidebarMenuServie from '@/shared/Editor/SidebarMenu/SidebarMenu.service';
import FinderService from '@/shared/DynamicForm/services/Finder.service';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ConfigDragDrop,
    SidebarMenuServie,
    FinderService
  },
});