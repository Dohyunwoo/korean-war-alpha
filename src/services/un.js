import Vue from 'vue'
import VueCompositionApi, { reactive } from '@vue/composition-api'
Vue.use(VueCompositionApi)

const api_un = "https://korean-war-alpha-un.firebaseio.com/UN.json";

const un = reactive({
  list: [],
  fetchData() {
    fetch(api_un).then(res => res.json()).then(j => {
      j.map(data => {
        const {
          applydvs: assistance,
          entwr_natnnm: country,
          entwr_yypsnnl: personnel,
          damage_sbsc: damage,
          dthbttl: dead,
          wound: injury,
          miss: missing,
          pow: captive
        } = data;
        un.list.push(
          { assistance, country, personnel, damage,
            dead, injury, missing, captive })
      });
    });
  }
})

un.fetchData();

export default un
