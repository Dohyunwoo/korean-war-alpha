<template>
  <div>
    <div id="map" style="width:100%; height: 500px"></div>
    <ul v-for="d in map.data">
      <li v-for="d in map.data">
        {{ d }}
      </li>
    </ul>
  </div>
</template>

<script>
  import { reactive, onUpdated } from '@vue/composition-api';
  const api = 'https://korean-war-alpha.firebaseio.com/DATA.json' 

  export default {
    setup () {
      const map = reactive({
        init: {},
        markers: {},
        default: { lat: 37.5642135, lng: 127.0016985 },
        data: []
      });

      function initMap() {
        map.init = new window.google.maps.Map(document.getElementById('map'), {
          center: map.default,
          zoom: 8
        });
        /*
        new window.google.maps.Geocoder().geocode({'address':'서울특별시 영등포구'}, (results, status) => {
          if(results!=""){
            var location=results[0].geometry.location;
            var lat=location.lat();
            var lng=location.lng(); 
            map.markers = new window.google.maps.Marker({ 
              id:1,
              position: new window.google.maps.LatLng(lat, lng),
              map: map.init
            });
          }
        })
        */
      }
      window.koreanwar = initMap
      
      fetch(api).then(res => { return res.json()}).then(j => {
        return j.map(data => { return {'address': data.addtn_itm_3} })
      }).then(ds => {
        map.data = ds;
      });

      return { map }
    }
  }
</script>
