<template>
  <div id="offcanvas-map" uk-offcanvas="mode: reveal" v-if="!IsMobile.data">
    <div class="uk-offcanvas-bar">
      <button class="uk-offcanvas-close" type="button" uk-close></button>
      <h2>타이틀</h2>
      <p>{{ warMap.mapData.title }}</p>
      <h2>날  짜</h2>
      <p>{{ warMap.mapData.date }}</p>
      <h2>격전지</h2>
      <p>{{ warMap.mapData.location }}</p>
      <h2>사령관</h2>
      <p>{{ warMap.mapData.cmmndr }}</p>
      <h2>상세 설명</h2>
      <p v-html="warMap.mapData.ctnt"></p>
    </div>
  </div>
</template>
<script>
  import warMap from "@/services/map"
  import IsMobile from "@/services/mobile-check"

  export default {
    setup() {
      return { warMap, IsMobile }
    }
  }
</script>
