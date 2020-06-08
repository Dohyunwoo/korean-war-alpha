import Vue from 'vue'
import VueRouter from 'vue-router'
import router from '@/router'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
    router,
    render: h => <router-view/>
}).$mount('#app')
