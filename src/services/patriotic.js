import Vue from 'vue'
import VueCompositionApi, { reactive, computed } from '@vue/composition-api'
Vue.use(VueCompositionApi)

const api_patriotic = "https://korean-war-alpha-cdr.firebaseio.com/DATA.json";
const patriotic = reactive({
  list: [],
  detail: "",
  size: 10,
  pageNumber: 0,
  pageCount: computed(() => Math.ceil(
    patriotic.list.length/patriotic.size)),
  paginatedData: computed(() => patriotic.list.slice(
    patriotic.pageNumber * patriotic.size,
    (patriotic.pageNumber * patriotic.size) + patriotic.size)),
  setPage(num) { patriotic.pageNumber = num - 1; },
  detailChange(item) { patriotic.detail = item.detail },
  nextPage() {
    patriotic.pageNumber < patriotic.pageCount - 1 ?
      patriotic.pageNumber++ :
      alert("마지막 페이지 입니다.")
  },
  prevPage() {
    patriotic.pageNumber > 0 ?
      patriotic.pageNumber-- :
      patriotic.pageNumber = 0
  },
  fetchData() {
    fetch(api_patriotic).then(res => res.json()).then(j => {
      j.map((data, index) => {
        const {
          addtn_itm_5: career,
          addtn_itm_6: native,
          addtn_itm_7: rank,
          addtn_itm_8: medal,
          ctnt: detail,
          title
        } = data;
        patriotic.list.push(
          { career, native, rank, medal, detail, title })
      });
    });
  }
});

patriotic.fetchData();

export default patriotic;
