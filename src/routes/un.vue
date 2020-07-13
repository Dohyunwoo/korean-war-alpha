<template>
  <div class="uk-container uk-container-small">
    <TopNav />
    <UnCountryList />
    <Footer />
  </div>
</template>
<script>
import TopNav from "@/components/top-nav";
import UnCountryList from "@/components/un-country-list";
import Footer from "@/components/footer";

export default {
  components: { TopNav, UnCountryList, Footer }
}
</script>
