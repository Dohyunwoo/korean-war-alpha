<template>
  <div class="uk-container uk-container-small">
    <TopNav />
    <TopLabel />
    <DropdownMonth />
    <MapArea />
    <OffCanvas />
    <DescriptionList />
    <Footer />
  </div>
</template>
<script>
import TopNav from "@/components/top-nav";
import TopLabel from "@/components/top-label";
import DropdownMonth from "@/components/dropdown-month";
import OffCanvas from "@/components/off-canvas";
import DescriptionList from "@/components/description-list";
import MapArea from "@/components/map-area";
import Footer from "@/components/footer";
import warMap from "@/services/map";

export default {
  components: {
    TopNav, TopLabel, DropdownMonth, OffCanvas,
    DescriptionList,MapArea,Footer
  },
  mounted() {
    warMap.count = 0;
    warMap.monthSelected = "---전체---";
    warMap.initMap();
    warMap.mapDataList.map((rdata, index) => {
      warMap.drawMarkers(rdata, index);
    });
  }}
</script>
