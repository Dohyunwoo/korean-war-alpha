import Vue from 'vue'
import VueCompositionApi, { reactive } from '@vue/composition-api'

Vue.use(VueCompositionApi) 

const isMobile = reactive({
  data : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})

export default isMobile
