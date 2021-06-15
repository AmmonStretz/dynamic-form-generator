import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import WizardEditor from '../shared/Editor/WizardEditor.vue';
import WizardListEditor from '../shared/Editor/WizardListEditor.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/editor',
    name: 'Editor',
    component: WizardEditor,
  },
  {
    path: '/editor/wizards',
    name: 'WizardListEditor',
    component: WizardListEditor
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
