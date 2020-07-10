<template>
  <div class="uk-container uk-container-small">
    <TopNav />
    <TopLabel />
    <DropdownMonth />
    <MapArea />
    <OffCanvas />
    <DescriptionList />
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import TopNav from "@/components/top-nav";
import TopLabel from "@/components/top-label";
import DropdownMonth from "@/components/dropdown-month";
import OffCanvas from "@/components/off-canvas";
import DescriptionList from "@/components/description-list";
import MapArea from "@/components/map-area";
import warMap from "@/services/map";

const api = "https://korean-war-alpha.firebaseio.com/DATA.json";

export default {
  components: {
    TopNav, TopLabel, DropdownMonth, OffCanvas,
    DescriptionList,MapArea
  },
  setup() {
    fetch(api)
      .then(res => {
        return res.json();
    }).then(j => {
      warMap.initMap();
      return j.map(data => {
        const ym = warMap.yearMonth(data);
        const {
          addtn_itm_2: date,
          addtn_itm_3: location,
          addtn_itm_4: cmmndr,
          addtn_itm_6: pos,
          addtn_itm_5: where,
          ctnt, title
        } = data;
        warMap.mapDataList.push({ date, location, cmmndr, pos, where, ctnt, title, ym })
        return { date, location, cmmndr, pos, where, ctnt, title, ym } 
      });
    }).then(ds => {
      warMap.count = 0;
      ds.map((rdata, index) => {
        warMap.drawMarkers(rdata, index);
      });
    });
  }
};
</script>
