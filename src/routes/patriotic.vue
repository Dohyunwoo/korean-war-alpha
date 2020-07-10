<template>
  <div class="uk-container uk-container-small">
    <TopNav />
    <h1 class="uk-heading-divider">
      호국 선열 명단 
      <span class="uk-text-meta"> (총 {{patriotic.list.length}}명)</span>
    </h1>
    <div class="uk-overflow-auto">
      <table class="uk-table uk-table-striped">
        <thead>
          <tr>
            <th class="uk-table-expand">성    함</th>
            <th class="uk-table-expand" style="min-width: 210px">생몰 연도</th>
            <th class="uk-table-expand" style="min-width: 200px">출 생 지</th>
            <th class="uk-table-expand" style="min-width: 200px">계    급</th>
            <th class="uk-table-expand" style="min-width: 350px">훈    장</th>
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
            <td><a href="#modal-example" uk-toggle @click="detailChange(item)">자세히 보기</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <ul class="uk-pagination uk-flex-center uk-margin-large-bottom" uk-margin>
      <li><a @click="prevPage"><span uk-pagination-previous></span> 이전</a></li>
      <li><span>{{ pageNumber + 1 }} / {{ patriotic.pageCount }}</span></li>
      <li><a @click="nextPage">다음 <span uk-pagination-next></span></a></li>
    </ul>
    <h1 class="uk-heading-divider">훈장 사진</h1>
    <div class="uk-child-width-1-2@s uk-grid-match" uk-grid>
      <div>
        <div class="uk-card uk-card-hover uk-card-body">
          <h3 class="uk-card-title">태극무공훈장</h3>
          <img src="/images/honor/태극무공훈장.png"alt="미국 은성훈장">
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-hover uk-card-body">
          <h3 class="uk-card-title">을지무공훈장</h3>
          <img src="/images/honor/을지무공훈장.png"alt="을지무공훈장">
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-hover uk-card-body">
          <h3 class="uk-card-title">충무무공훈장</h3>
          <img src="/images/honor/충무무공훈장.png"alt="충무무공훈장">
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-hover uk-card-body">
          <h3 class="uk-card-title">화랑무공훈장</h3>
          <img src="/images/honor/화랑무공훈장.png"alt="화랑무공훈장">
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-hover uk-card-body">
          <h3 class="uk-card-title">보국통일장</h3>
          <img src="/images/honor/보국통일장.png" alt="보국통일장">
        </div>
      </div>
    </div>
    <div id="modal-example" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">상세 설명</h2>
        <p v-html="patriotic.detail"></p>
        <p class="uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed, ref } from "@vue/composition-api";
import TopNav from "@/components/top-nav";

const api_patriotic = "https://korean-war-alpha-cdr.firebaseio.com/DATA.json";

export default {
  components: { TopNav },
  setup() {
    const patriotic = reactive({
      list: [],
      detail: "",
      pageCount: computed(() => Math.ceil(patriotic.list.length/size.value)),
      paginatedData: computed(() => patriotic.list.slice(pageNumber.value * size.value, (pageNumber.value * size.value) + size.value))
    });

    const size = ref(10);
    const pageNumber = ref(0);

    function setPage(num) { pageNumber.value = num - 1; }
    function nextPage(){ pageNumber.value < patriotic.pageCount - 1 ? pageNumber.value++ : alert("마지막 페이지 입니다.") }
    function prevPage(){ pageNumber.value > 0 ? pageNumber.value-- : pageNumber.value = 0}
    function detailChange(item) { patriotic.detail = item.detail }

    fetch(api_patriotic).then(res => res.json())
      .then(j => {
        return j.map((data, index) => {
          const {
            addtn_itm_5: career,
            addtn_itm_6: native,
            addtn_itm_7: rank,
            addtn_itm_8: medal,
            ctnt: detail,
            title
          } = data;
          return { career, native, rank, medal, detail, title }
        })
      }).then(ds => {
        patriotic.list = ds;
      });

    return { patriotic, detailChange, nextPage, prevPage, pageNumber, setPage }
  }
}
</script>
