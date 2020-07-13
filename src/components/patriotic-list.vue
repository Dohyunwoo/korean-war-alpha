<template>
  <div>
    <h1 class="uk-heading-divider">
      호국 선열 명단 
      <span class="uk-text-meta"> (총 {{patriotic.list.length}}명)</span>
    </h1>
    <div class="uk-overflow-auto">
      <table class="uk-table uk-table-striped">
        <thead>
          <tr>
            <th class="uk-table-expand">성    함</th>
            <th class="uk-table-expand"
              style="min-width: 210px">생몰 연도</th>
            <th class="uk-table-expand"
              style="min-width: 200px">출 생 지</th>
            <th class="uk-table-expand"
              style="min-width: 200px">계    급</th>
            <th class="uk-table-expand"
              style="min-width: 350px">훈    장</th>
            <th class="uk-table-expand">약    력</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in patriotic.paginatedData">
            <td>{{ item.title }}</td>
            <td>{{ item.career == "" ? "-" : item.career }}</td>
            <td>{{ item.native == "" ? "-" : item.native }}</td>
            <td>{{ item.rank == "" ? "-" : item.rank }}</td>
            <td>{{ item.medal == "" ? "-" : item.medal }}</td>
            <td><a href="#modal-example" uk-toggle
                @click="patriotic.detailChange(item)">자세히 보기</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ul class="uk-pagination uk-flex-center
      uk-margin-large-bottom" uk-margin>
      <li>
        <a @click="patriotic.prevPage">
          <span uk-pagination-previous></span> 이전</a>
      </li>
      <li>
        <span>
          {{ patriotic.pageNumber + 1 }} / {{ patriotic.pageCount }}
        </span>
      </li>
      <li>
        <a @click="patriotic.nextPage">다음 
          <span uk-pagination-next></span></a>
      </li>
    </ul>
    <div id="modal-example" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">상세 설명</h2>
        <p v-html="patriotic.detail"></p>
        <p class="uk-text-right">
          <button class="uk-button uk-button-primary
            uk-modal-close" type="button">Cancel</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import patriotic from "@/services/patriotic"

export default {
  setup() {
    return { patriotic }
  }
}
</script>
