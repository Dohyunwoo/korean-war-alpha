<template>
  <div>
    <h1 class="uk-heading-divider">UN 참전국 목록</h1>
    <div class="uk-overflow-auto uk-margin-large-bottom">
      <table class="uk-table uk-table-striped">
        <thead>
          <tr>
            <th class="uk-table-expand">참전국</th>
            <th class="uk-table-expand">지원 구분</th>
            <th class="uk-table-expand">참전 인원</th>
            <th class="uk-table-expand">사상자 수</th>
            <th class="uk-table-expand">전사자 수</th>
            <th class="uk-table-expand">부상자 수</th>
            <th class="uk-table-expand">실종자 수</th>
            <th class="uk-table-expand">포로 수</th>
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
  </div>
</template>
<script>
import un from "@/services/un"

export default {
  setup() {
    return { un }
  }
}
</script>
