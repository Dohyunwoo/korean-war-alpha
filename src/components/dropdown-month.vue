<template>
  <div class="uk-margin">
    <label class="uk-form-label" for="form-stacked-select">전투 시작 월</label>
    <div class="uk-form-controls">  
      <select class="uk-select"
        v-model="warMap.monthSelected"
        @change="warMap.monthChange">
        <option>---전체---</option>
        <option>1950년 6월</option>
        <option>1950년 7월</option>
        <option>1950년 8월</option>
        <option>1950년 9월</option>
        <option>1950년 10월</option>
        <option>1950년 11월</option>
        <option>1950년 12월</option>
        <option>1951년 1월</option>
        <option>1951년 2월</option>
      </select>
    </div>
  </div>
</template>
<script>
  import warMap from '@/services/map'
  export default {
    setup() {
      return { warMap }
    }    
  }
</script>
