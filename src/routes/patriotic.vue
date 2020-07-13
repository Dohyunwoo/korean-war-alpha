<template>
  <div class="uk-container uk-container-small">
    <TopNav />
    <PatrioticList />
    <MedalList />
    <Footer />
  </div>
</template>

<script>
import TopNav from "@/components/top-nav";
import PatrioticList from "@/components/patriotic-list";
import MedalList from "@/components/medal-list";
import Footer from "@/components/footer";

export default {
  components: { TopNav, PatrioticList, MedalList, Footer },
}
</script>
