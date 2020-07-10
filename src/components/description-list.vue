<template>
  <div v-if="warMap.openList" class="uk-card uk-card-body uk-margin-top-large">
    <h2 id="warinfo">전투 정보</h2>
    <dl class="uk-description-list">
      <dt><button class="uk-button uk-button-text" uk-scroll>지도로 돌아가기</button></dt>
      <dt>타이틀</dt>
      <dd>{{ warMap.mapData.title }}</dd>
      <dt>날  짜</dt>
      <dd>{{ warMap.mapData.date }}</dd>
      <dt>격전지</dt>
      <dd>{{ warMap.mapData.location }}</dd>
      <dt>사령관</dt>
      <dd>{{ warMap.mapData.cmmndr }}</dd>
      <dt>상세 설명</dt>
      <dd v-html="warMap.mapData.ctnt"></dd>
      <dt><button class="uk-button uk-button-text" uk-scroll>지도로 돌아가기</button></dt>
    </dl>
  </div>
</template>
<script>
  import warMap from "@/services/map";
  
  export default {
    setup() {
      return { warMap }
    }
  }
</script>
