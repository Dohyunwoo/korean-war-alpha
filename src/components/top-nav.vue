<template>
  <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
    <nav class="uk-navbar-container uk-margin" uk-navbar style="background-color: white" v-if="!IsMobile.data">
      <router-link to="/" class="uk-navbar-item uk-logo uk-padding-remove-left uk-padding-remove-right">
        <img src="/logo.jpg" width="80px" height="80px">
      </router-link>
      <ul class="uk-navbar-nav">
        <li><router-link to="/">지도 보기</router-link></li>
        <li><router-link to="/patriotic">호국 선열</router-link></li>
        <li><router-link to="/un">UN 참전국</router-link></li>
      </ul>
    </nav>
    <nav class="uk-navbar-container uk-margin" uk-navbar style="background-color: white" v-if="IsMobile.data">
      <router-link to="/" class="uk-navbar-item uk-logo uk-padding-remove-left uk-padding-remove-right">
        <img src="/logo.jpg" width="50px" height="50px">
      </router-link>
      <ul class="uk-navbar-nav">
        <li><router-link to="/" style="font-size: 12px;">지도 보기</router-link></li>
        <li><router-link to="/patriotic" style="font-size: 12px;">호국 선열</router-link></li>
        <li><router-link to="/un" style="font-size: 12px;">UN 참전국</router-link></li>
      </ul>
    </nav>
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
