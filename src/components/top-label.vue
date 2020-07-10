<template>
  <div class="uk-flex uk-margin-bottom">
    <div>
      <span class="uk-label uk-label-danger">지상전</span> :
      <img data-src="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        width="15" height="15" alt="지상전 이미지" uk-img v-if="IsMobile.data">
      <img data-src="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        width="25" height="25" alt="지상전 이미지" uk-img v-else>
    </div>
    <div class="uk-margin-left">
      <span class="uk-label">공중전</span> :
      <img data-src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        width="15" height="15" alt="지상전 이미지" uk-img v-if="IsMobile.data">
      <img data-src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        width="25" height="25" alt="지상전 이미지" uk-img v-else>
    </div>
    <div class="uk-margin-left">
      <span class="uk-label uk-label-success">해상전</span> :
      <img data-src="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        width="15" height="15" alt="지상전 이미지" uk-img v-if="IsMobile.data">
      <img data-src="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        width="25" height="25" alt="지상전 이미지" uk-img v-else>
    </div>
  </div>
</template>

<script>
  import IsMobile from '@/services/mobile-check'
  export default {
    setup() {
      return { IsMobile }
    }    
  }
</script>
