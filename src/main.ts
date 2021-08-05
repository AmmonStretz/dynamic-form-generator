import Vue from 'vue';
import router from './router';
import store from './store';
import Vuex from 'vuex';

import RequiredValidatorPlugin from './shared/DynamicForm/Validators/any/Required.validator';
import MinNumberValidatorPlugin from './shared/DynamicForm/Validators/number/MinNumber.validator';
import MaxNumberValidatorPlugin from './shared/DynamicForm/Validators/number/MaxNumber.validator';
import IsEmailValidatorPlugin from './shared/DynamicForm/Validators/string/EmailString.validator';

import ParagraphPlugin from './shared/DynamicForm/Field/ContentFields/Paragraph';
import HyperlinkPlugin from './shared/DynamicForm/Field/ContentFields/Hyperlink';

import CheckboxPlugin from './shared/DynamicForm/Field/ValueFields/Checkbox';
import NumberInputPlugin from './shared/DynamicForm/Field/ValueFields/NumberInput';
import NumberRangePlugin from './shared/DynamicForm/Field/ValueFields/NumberRange';
import RadioButtonListPlugin from './shared/DynamicForm/Field/ValueFields/RadioButtonList';
import SelectPlugin from './shared/DynamicForm/Field/ValueFields/Select';
import TextAreaPlugin from './shared/DynamicForm/Field/ValueFields/TextArea';
import TextInputPlugin from './shared/DynamicForm/Field/ValueFields/TextInput';
import EmailInputPlugin from './shared/DynamicForm/Field/ValueFields/EmailInput';

import ValidationListPlugin from './shared/DynamicForm/Field/ValueFields/ValidationList';
import LogicInputPlugin from './shared/DynamicForm/Field/ValueFields/LogicInput';

Vue.config.productionTip = false;

(Vue as any).fieldPlugins = [];
(Vue as any).fieldParser = {};

// VALIDATOR PLUGINS
// any
Vue.use(RequiredValidatorPlugin)
// number
Vue.use(MinNumberValidatorPlugin)
Vue.use(MaxNumberValidatorPlugin)
// string
Vue.use(IsEmailValidatorPlugin)

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
Vue.use(EmailInputPlugin);

// Private Plugins
Vue.use(ValidationListPlugin);
Vue.use(LogicInputPlugin);

Vue.use(Vuex)
import App from './App.vue';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
