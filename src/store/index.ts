import { WizzardStatus } from '@/shared/DynamicForm/Wizzard/Wizzard.dto';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: Array<number>(),
    count: 0,
    status: { index: 0, forms: []} as WizzardStatus,
    listeners: [],
  },
  getters: {
  },
  mutations: {
    addToDo(state, todoModel: number) {
      console.log('mutation');
      console.log(state, todoModel);
      state.todos.push(todoModel);
    },
    countUp(state, a: number) {
      state.count+=a;
    }, 
    changeStatus(state, status: WizzardStatus) {
      state.status = status;
      state.listeners.forEach(listener => {
        listener.func(listener.key);
      });
    },
    addListener(state, listener: {key: string, func: (value: string)=>{}}) {
      state.listeners.push(listener);
    }
    // changeDesign(state, design: Design) {
    //   state.design = design;
    // }
  },
  actions: {
    addToDo(context, todoModel: number) {
      console.log('action');
      console.log(context, todoModel);
      
      context.commit('addToDo', todoModel);
    },
    countUp(context, a: number){
      context.commit('countUp', a)
    }, 
    changeStatus(context, status: WizzardStatus) {
      context.commit('changeStatus', status)
    },
    addListener(context, listener: {key: string, func: (value: any)=>{}}) {
      context.commit('addListener', listener)
    }
    // changeDesign(context, design: Design) {
    //   context.commit('design', design);
    // }
  }
});