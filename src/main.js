import Vue from "vue";
import VueRouter from "vue-router";
import router from "@/router";
import vuetify from "./plugins/vuetify";
import VueCompositionApi from '@vue/composition-api'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueCompositionApi);

new Vue({
  router,
  vuetify,
  render: (h) => <router-view />,
}).$mount("#app");
