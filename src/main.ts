import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuex from 'vuex';
import ParagraphPlugin from './shared/DynamicForm/Field/ContentFields/Paragraph';
import HyperlinkPlugin from './shared/DynamicForm/Field/ContentFields/Hyperlink';

import CheckboxPlugin from './shared/DynamicForm/Field/ValueFields/Checkbox';
import NumberInputPlugin from './shared/DynamicForm/Field/ValueFields/NumberInput';
import NumberRangePlugin from './shared/DynamicForm/Field/ValueFields/NumberRange';
import RadioButtonListPlugin from './shared/DynamicForm/Field/ValueFields/RadioButtonList';
import SelectPlugin from './shared/DynamicForm/Field/ValueFields/Select';
import TextAreaPlugin from './shared/DynamicForm/Field/ValueFields/TextArea';
import TextInputPlugin from './shared/DynamicForm/Field/ValueFields/TextInput';

Vue.config.productionTip = false;

(Vue as any).valueFields = [];
(Vue as any).contentFields = [];
(Vue as any).fieldParser = {};

// CONTENT FIELD PLUGINS

Vue.use(ParagraphPlugin);
Vue.use(HyperlinkPlugin);

// VALUE FIELD PLUGINS

Vue.use(CheckboxPlugin);
Vue.use(NumberInputPlugin);
Vue.use(NumberRangePlugin);
Vue.use(RadioButtonListPlugin);
Vue.use(SelectPlugin);
Vue.use(TextAreaPlugin);
Vue.use(TextInputPlugin);

Vue.use(Vuex)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
