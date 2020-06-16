

<template>
  <div>
    <div id="map" style="width:100%; height: 500px"></div>
    <!-- ul v-for="d in map.data">
      <li v-for="d in map.data">
        {{ d }}
      </li>
    </ul-->
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
const api = "https://korean-war-alpha.firebaseio.com/DATA.json";

export default {
  setup() {
    const warMap = reactive({
      init: {},
      markers: {},
      default: { lat: 37.5642135, lng: 127.0016985 }
    });

    function initMap() {
      warMap.init = new window.google.maps.Map(document.getElementById("map"), {
        center: warMap.default,
        zoom: 8
      });
    }
    window.koreanwar = initMap;
    // var naviColor = "white";
    // var naviImage = new window.google.maps.MarkerImage(
    //   "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" +
    //     naviColor,
    //   new window.google.maps.Size(21, 34),
    //   new window.google.maps.Point(0, 0),
    //   new window.google.maps.Point(10, 34)
    // );
    // var airColor = "blue";
    // var airImage = new window.google.maps.MarkerImage(
    //   "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" +
    //     airColor,
    //   new window.google.maps.Size(21, 34),
    //   new window.google.maps.Point(0, 0),
    //   new window.google.maps.Point(10, 34)
    // );
    // var armyColor = "red";
    // var armyImage = new window.google.maps.MarkerImage(
    //   "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" +
    //     armyColor,
    //   new window.google.maps.Size(21, 34),
    //   new window.google.maps.Point(0, 0),
    //   new window.google.maps.Point(10, 34)
    // );

    function drawMarkers(rdata, index) {
      console.log(rdata);
      warMap.markers = new window.google.maps.Marker({
        id: index,
        position: new window.google.maps.LatLng(
          rdata.pos.split(",")[0],
          rdata.pos.split(",")[1]
        ),
        map: warMap.init,
        icon:
          rdata.where == "is_naval_warfare"
            ? "http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png"
            : rdata.where == "is_air_war"
            ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      });
      warMap.markers.addListener("click", function() {
        console.log(warMap.markers.id);
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

    fetch(api)
      .then(res => {
        return res.json();
      })
      .then(j => {
        return j.map(data => {
          var rdata = {};
          rdata.pos = data.addtn_itm_6;
          rdata.where = data.addtn_itm_5;
          return rdata;
        });
      })
      .then(ds => {
        // console.log(ds);
        ds.map((rdata, index) => {
          // console.log(ds);
          drawMarkers(rdata, index);
        });
      });
  }
};
</script>
