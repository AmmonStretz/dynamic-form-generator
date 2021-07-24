import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import FinderView from "../views/Finder.vue";
import EditorView from "../views/Editor.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'FinderView',
    component: FinderView,
  },
  {
    path: '/editor',
    name: 'EditorView',
    component: EditorView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
