<template>
  <div class="uk-container uk-container-small">
    <div class="uk-flex uk-margin-top uk-margin-bottom">
      <div>
        <span class="uk-label uk-label-danger">지상전</span> :
        <img data-src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" width="25" height="25" alt="지상전 이미지" uk-img>
      </div>
      <div class="uk-margin-left">
        <span class="uk-label">공중전</span> :
        <img data-src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" width="25" height="25" alt="공중전 이미지" uk-img>
      </div>
      <div class="uk-margin-left">
        <span class="uk-label uk-label-success">해상전</span> :
        <img data-src="https://maps.google.com/mapfiles/ms/icons/green-dot.png" width="25" height="25" alt="해상전 이미지" uk-img>
      </div>
    </div>
    <div id="map" style="width:100%; height: 500px"></div>
    <div id="offcanvas-map" uk-offcanvas="mode: reveal">
      <div class="uk-offcanvas-bar">
        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <h2>타이틀</h2>
        <p>{{ warMap.mapData.title }}</p>
        <h2>날  짜</h2>
        <p>{{ warMap.mapData.date }}</p>
        <h2>격전지</h2>
        <p>{{ warMap.mapData.location }}</p>
        <h2>사령관</h2>
        <p>{{ warMap.mapData.cmmndr }}</p>
        <h2>상세 설명</h2>
        <p v-html="warMap.mapData.info"></p>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import UIkit from "uikit";
const api = "https://korean-war-alpha.firebaseio.com/DATA.json";
const api_un = "https://korean-war-alpha-un.firebaseio.com/UN.json";

export default {
  setup() {
    const warMap = reactive({
      init: {},
      markers: [],
      mapData: {}
    });
    function initMap() {
      warMap.init = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.5642135, lng: 127.0016985 },
        zoom: 7,
        disableDefaultUI: true
      });
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
        warMap.mapData = rdata;
        UIkit.offcanvas('#offcanvas-map').show();
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
        ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        : where == "is_air_war"
        ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        : "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }
    fetch(api)
      .then(res => {
        return res.json();
      })
      .then(j => {
        initMap();
        return j.map(data => {
          const {
            addtn_itm_2: date,
            addtn_itm_3: location,
            addtn_itm_4: cmmndr,
            addtn_itm_6: pos,
            addtn_itm_5: where,
            ctnt:info, title
          } = data;
          return { date, location, cmmndr, pos, where, info, title } 
        });
      })
      .then(ds => {
        ds.map((rdata, index) => {
          drawMarkers(rdata, index);
        });
      });
    return { warMap }
  }
};
</script>
