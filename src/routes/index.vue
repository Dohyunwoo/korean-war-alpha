<template>
  <div id="map" style="width:100%; height: 100vh;">
    <script
      type="application/javascript"
      async
      defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAEUyBvbBDrDO4i9dBXV8nzwPZynVlxXgE&callback=initMap&region=kr"
    ></script>

    <span uk-icon="robot"></span>
  </div>
</template>

<script type="application/javascript">
window.onload = function initMap() {
  var seoul = { lat: 37.5642135, lng: 127.0016985 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: seoul,
  });
};
</script>
