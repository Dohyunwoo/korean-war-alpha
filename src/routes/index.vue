

<template>
  <div ref="main" id="main">
    <div ref="myCanv" id="myCanv" class="Canv">
      <span id="title"></span>
    </div>
    <a @click="navi" id="closebtn">&times;</a>
    <div id="map" style="width:100%; height: 500px"></div>
    <!-- ul v-for="d in map.data">
      <li v-for="d in map.data">
        {{ d }}
      </li>
    </ul-->
  </div>
</template>
<style type='text/css'>
.Canv {
  height: 100%;
  width: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: aqua;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;
}
.Canv span {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 16pt;
  color: red;
  display: block;
  transition: 0.3s;
}

#closebtn {
  position: absolute;
  top: 20px;
  left: 0;
  font-size: 36px;
  z-index: 1;
  width: 20px;
  height: 48px;
  cursor: pointer;
  transition: margin-left 0.5s;
  background-color: grey;
}
#main {
  transition: margin-left 0.5s;
  padding: 20px;
}
</style>
<script>
import { reactive } from "@vue/composition-api";
const api = "https://korean-war-alpha.firebaseio.com/DATA.json";

export default {
  methods: {
    navi: function() {
      if (document.getElementById("myCanv").classList.contains("open")) {
        document.getElementById("closebtn").style.marginLeft = "0";
        document.getElementById("myCanv").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("myCanv").classList.remove("open");
      } else {
        document.getElementById("closebtn").style.marginLeft = "250px";
        document.getElementById("myCanv").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("myCanv").classList.add("open");
      }
    }
  },
  setup() {
    const warMap = reactive({
      init: {},
      markers: new Array(),
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
      console.log(index);

      warMap.markers[index] = new window.google.maps.Marker({
        id: index,
        position: new window.google.maps.LatLng(
          rdata.pos.split(",")[0],
          rdata.pos.split(",")[1]
        ),
        map: warMap.init,
        icon: whereIsWar(rdata.where),

        data: rdata
      });
      var infoWindow = new window.google.maps.InfoWindow({
        content: warMap.markers[index].data.title
      });

      warMap.markers[index].addListener("click", function() {
        this.map.setZoom(10);
        this.map.setCenter(this.getPosition());
        document.getElementById("closebtn").style.marginLeft = "250px";
        document.getElementById("myCanv").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("myCanv").classList.add("open");
        // this.$methods.Nav();
        console.log(this.id);
      });
      warMap.markers[index].addListener("focusout", function() {
        this.closeNav();
      });
      warMap.markers[index].addListener("mouseover", function() {
        infoWindow.open(this.map, this);
      });
      warMap.markers[index].addListener("mouseout", function() {
        infoWindow.close();
      });
    }
    function whereIsWar(where) {
      return where == "is_naval_warfare"
        ? "http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png"
        : where == "is_air_war"
        ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        : "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
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
          rdata.date = data.addtn_itm_2;
          rdata.location = data.addtn_itm_10;
          rdata.cmmndr = data.addtn_itm_4;
          rdata.pos = data.addtn_itm_6;
          rdata.where = data.addtn_itm_5;
          rdata.info = data.ctnt;
          rdata.title = data.title;
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
