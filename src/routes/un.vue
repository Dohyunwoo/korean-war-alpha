<template>
  <div class="uk-container uk-container-small">
    <TopNav />
    <h1 class="uk-heading-divider">UN 참전국 목록</h1>
    <table class="uk-table uk-table-striped uk-table-responsive uk-margin-large-bottom">
      <thead>
        <tr>
          <th>참전국</th>
          <th>지원 구분</th>
          <th>참전 인원</th>
          <th>사상자 수</th>
          <th>전사자 수</th>
          <th>부상자 수</th>
          <th>실종자 수</th>
          <th>포로 수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in un.list">
          <td>{{ item.country }}</td>
          <td>{{ item.assistance == "" ? "-" : item.assistance }}</td>
          <td>{{ item.personnel == "" ? "-" : item.personnel }}</td>
          <td>{{ item.damage == "" ? "-" : item.damage }}</td>
          <td>{{ item.dead == "" ? "-" : item.dead }}</td>
          <td>{{ item.injury == "" ? "-" : item.injury }}</td>
          <td>{{ item.missing == "" ? "-" : item.missing }}</td>
          <td>{{ item.captive == "" ? "-" : item.captive }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import TopNav from "@/components/top-nav";

const api_un = "https://korean-war-alpha-un.firebaseio.com/UN.json";

export default {
  components: { TopNav },
  setup() {
    const un = reactive({
      list: {}
    })
    fetch(api_un).then(res => res.json()).then(j => {
      return j.map(data => {
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
        return { assistance, country, personnel, damage, dead, injury, missing, captive }
      })
    }).then(ds => {
      un.list = ds
    });
    return { un }
  }
}
</script>
