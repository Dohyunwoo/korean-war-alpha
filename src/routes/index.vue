<template>
  <div class="uk-container uk-container-small" ref="main" id="main">
    <div ref="myCanv" id="myCanv" class="Canv">
      <span id="title"></span>
    </div>
    <a @click="navi" id="closebtn">&times;</a>
    <div id="map" style="width:100%; height: 500px"></div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
const api = "https://korean-war-alpha.firebaseio.com/DATA.json";

export default {
  setup() {
    const warMap = reactive({
      init: {},
      markers: [],
      default: { lat: 37.5642135, lng: 127.0016985 }
    });
    function initMap() {
      warMap.init = new window.google.maps.Map(document.getElementById("map"), {
        center: warMap.default,
        zoom: 8
      });
    }
    window.koreanwar = initMap;
    function navi() {
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
    function drawMarkers(rdata, index) {
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
        content: `<p>전투명: ${warMap.markers[index].data.title}</p>
                  <p>날짜: ${warMap.markers[index].data.date}</p>`
      });

      warMap.markers[index].addListener("click", function() {
        this.map.setZoom(10);
        this.map.setCenter(this.getPosition());
        document.getElementById("closebtn").style.marginLeft = "250px";
        document.getElementById("myCanv").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("myCanv").classList.add("open");
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
    fetch(api)
      .then(res => {
        return res.json();
      })
      .then(j => {
        return j.map(data => {
          const rdata = {};
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
        ds.map((rdata, index) => {
          drawMarkers(rdata, index);
        });
      });
    return { navi }
  }
};
</script>
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
