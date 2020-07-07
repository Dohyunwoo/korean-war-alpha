<template>
  <div class="uk-container uk-container-small">
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
      <nav class="uk-navbar-container uk-margin" uk-navbar>
        <router-link to="/" class="uk-navbar-item uk-logo"><img src="/logo.jpg" width="80px" height="80px"></router-link>
        <ul class="uk-navbar-nav">
          <li><router-link to="/">지도 보기</router-link></li>
          <li><router-link to="/patriotic">호국 선열</router-link></li>
          <li><router-link to="/un">UN 참전국</router-link></li>
        </ul>
      </nav>
    </div>
    <div class="uk-flex uk-margin-top uk-margin-bottom">
      <div>
        <span class="uk-label uk-label-danger">지상전</span> :
        <img data-src="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
          width="15" height="15" alt="지상전 이미지" uk-img v-if="warMap.isMobile">
        <img data-src="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
          width="25" height="25" alt="지상전 이미지" uk-img v-else>
      </div>
      <div class="uk-margin-left">
        <span class="uk-label">공중전</span> :
        <img data-src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          width="15" height="15" alt="지상전 이미지" uk-img v-if="warMap.isMobile">
        <img data-src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          width="25" height="25" alt="지상전 이미지" uk-img v-else>
      </div>
      <div class="uk-margin-left">
        <span class="uk-label uk-label-success">해상전</span> :
        <img data-src="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
          width="15" height="15" alt="지상전 이미지" uk-img v-if="warMap.isMobile">
        <img data-src="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
          width="25" height="25" alt="지상전 이미지" uk-img v-else>
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="form-stacked-select">전투 시작 월</label>
      <div class="uk-form-controls">
        <select class="uk-select" v-model="warMap.monthSelected" @change="monthChange">
          <option>---전체---</option>
          <option>1950년 6월</option>
          <option>1950년 7월</option>
          <option>1950년 8월</option>
          <option>1950년 9월</option>
          <option>1950년 10월</option>
          <option>1950년 11월</option>
          <option>1950년 12월</option>
          <option>1951년 1월</option>
          <option>1951년 2월</option>
        </select>
      </div>
    </div>
    <div id="map" style="width:100%; height: 450px"></div>
    <div>
      <span class="uk-text-bold uk-badge">총 접전지 : {{warMap.count}}</span>
    </div>
    <div id="offcanvas-map" uk-offcanvas="mode: reveal" v-if="!warMap.isMobile">
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
    <div v-if="warMap.openList" class="uk-card uk-card-body uk-margin-top-large">
      <h2 id="warinfo">전투 정보</h2>
      <dl class="uk-description-list">
        <dt><button class="uk-button uk-button-text" uk-scroll>지도로 돌아가기</button></dt>
        <dt>타이틀</dt>
        <dd>{{ warMap.mapData.title }}</dd>
        <dt>날  짜</dt>
        <dd>{{ warMap.mapData.date }}</dd>
        <dt>격전지</dt>
        <dd>{{ warMap.mapData.location }}</dd>
        <dt>사령관</dt>
        <dd>{{ warMap.mapData.cmmndr }}</dd>
        <dt>상세 설명</dt>
        <dd v-html="warMap.mapData.info"></dd>
        <dt><button class="uk-button uk-button-text" uk-scroll>지도로 돌아가기</button></dt>
      </dl>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import UIkit from "uikit";
const api = "https://korean-war-alpha.firebaseio.com/DATA.json";
const api_un = "https://korean-war-alpha-un.firebaseio.com/UN.json";
const api_patriotic = "https://korean-war-alpha-cdr.firebaseio.com/DATA.json";

export default {
  setup() {
    const once = false;
    const warMap = reactive({
      init: {},
      markers: [],
      mapData: {},
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      openList: false,
      monthSelected: "---전체---",
      mapDataList: [],
      patricList: [],
      count: 0
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

      warMap.count++;

      var infoWindow = new window.google.maps.InfoWindow({
        content: `<p>전투명: ${warMap.markers[index].data.title}</p>
                  <p>날짜: ${warMap.markers[index].data.date}</p>`
      });

      warMap.markers[index].addListener("click", function() {
        warMap.mapData = rdata;
        if(!once) { fetchPatriotic(); !!once; }
        if(warMap.isMobile) {
          warMap.openList = true;
          window.scrollTo({top:600, behavior:'smooth'})
        } else {
          UIkit.offcanvas('#offcanvas-map').show();
          warMap.openList = false;
        } 
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
    function monthChange() {
      initMap();
      warMap.count = 0;
      warMap.openList = false;
      if(warMap.monthSelected === "---전체---") {
        warMap.mapDataList.map((d,index) => {
          drawMarkers(d, index)
        })
      } else {
        warMap.mapDataList.map((d,index) => {
          if(warMap.monthSelected === d.ym) {
            drawMarkers(d, index)
          }
        })
      }
    }
    fetch(api)
      .then(res => {
        return res.json();
      })
      .then(j => {
        initMap();
        return j.map(data => {
          const dateSplit = data.addtn_itm_2.split('-');
          let ym = dateSplit[0].split('.')[0] +'년 '+ dateSplit[0].split('.')[1] + '월';
          const {
            addtn_itm_2: date,
            addtn_itm_3: location,
            addtn_itm_4: cmmndr,
            addtn_itm_6: pos,
            addtn_itm_5: where,
            ctnt:info, title
          } = data;
          warMap.mapDataList.push({ date, location, cmmndr, pos, where, info, title, ym })
          return { date, location, cmmndr, pos, where, info, title, ym } 
        });
      })
      .then(ds => {
        ds.map((rdata, index) => {
          drawMarkers(rdata, index);
        });
        warMap.mapLoading = true;
      });
    function fetchPatriotic() {
      fetch(api_patriotic).then(res => res.json())
        .then(j => {
          return j.map((data, index) => {
            const {
              addtn_itm_5: career,
              addtn_itm_6: native,
              addtn_itm_7: rank,
              addtn_itm_8: medal,
              ctnt: detail,
              title
            } = data;
            return { career, native, rank, medal, detail, title }
          })
        }).then(ds => {
          warMap.patricList = ds
        })
    }
    return { warMap, monthChange }
  }
};
</script>
