<template>
  <div>
    <div id="map" style="width:100%; height: 500px"></div>
    <!-- ul v-for="d in map.data">
      <li v-for="d in map.data">
        {{ d }}
      </li>
    </ul -->
  </div>
</template>

<script>
  import { reactive } from '@vue/composition-api';
  const api = 'https://korean-war-alpha.firebaseio.com/DATA.json' 

  export default {
    setup () {
      const warMap = reactive({
        init: {},
        markers: {},
        default: { lat: 37.5642135, lng: 127.0016985 }
      });

      function initMap() {
        warMap.init = new window.google.maps.Map(document.getElementById('map'), {
          center: warMap.default,
          zoom: 8
        });
      }
      window.koreanwar = initMap
      
      function drawMarkers(ll,index) {
        warMap.markers = new window.google.maps.Marker({
          id:index,
          position: new window.google.maps.LatLng(ll.split(',')[0],ll.split(',')[1]),
          map: warMap.init
        });
      }
      
      /*
      function geoCoder(addr_data,index) {
        new window.google.maps.Geocoder().geocode(addr_data, (results, status) => {
          if(results!=""){
            const updates = {};
            const location=results[0].geometry.location;
            const lat=location.lat();
            const lng=location.lng();
            updates[`/DATA/${index}/addtn_itm_6`] = `${lat},${lng}`;
            firebase.database().ref().update(updates).then((res) => { console.log(res) })
          }
        });
      }
      */
      
      fetch(api).then(res => { return res.json()}).then(j => {
        return j.map(data => { return data.addtn_itm_6 })
      }).then(ds => {
        ds.map((ll, index) => { drawMarkers(ll,index) });
      });
    }
  }
</script>
