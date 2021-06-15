import { WizardStatus } from '@/shared/DynamicForm/Wizard/Wizard.config';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: Array<number>(),
    count: 0,
    // status: { index: 0, forms: []} as WizardStatus,
    listeners: [],
  },
  getters: {
  },
  mutations: {
    addToDo(state, todoModel: number) {
      state.todos.push(todoModel);
    },
    countUp(state, a: number) {
      state.count+=a;
    }, 
    changeStatus(state, status: WizardStatus) {
      // state.status = status;
      // state.listeners.forEach(listener => {
      //   listener.func(listener.key);
      // });
    },
    addListener(state, listener: {key: string, root: WizardStatus} ) {
      state.listeners.push(listener);
    }
    // changeDesign(state, design: Design) {
    //   state.design = design;
    // }
  },
  actions: {
    addToDo(context, todoModel: number) {
      
      context.commit('addToDo', todoModel);
    },
    countUp(context, a: number){
      context.commit('countUp', a)
    }, 
    changeStatus(context, status: WizardStatus) {
      context.commit('changeStatus', status)
    },
    addListener(context, listener: {key: string, root:WizardStatus}) {
      context.commit('addListener', listener)
    }
    // changeDesign(context, design: Design) {
    //   context.commit('design', design);
    // }
  }
});