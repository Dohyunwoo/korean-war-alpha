<template>
  <div>
    <div class="uk-margin-small">
      <span class="uk-text-bold uk-badge">총 접전지 : {{warMap.count}}</span>
    </div>
    <div id="map" style="width:100%; height: 450px"></div>
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
