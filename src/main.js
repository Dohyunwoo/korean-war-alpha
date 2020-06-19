import Vue from "vue";
import VueRouter from "vue-router";
import router from "@/router";
import VueCompositionApi from '@vue/composition-api'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import Styles from 'uikit/src/less/uikit.less'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueCompositionApi);

UIkit.use(Icons) && Styles;

new Vue({
  router,
  render: (h) => <router-view />,
}).$mount("#app");
