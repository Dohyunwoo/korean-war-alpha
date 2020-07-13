import Vue from 'vue'
import VueCompositionApi, { reactive } from '@vue/composition-api'
import UIkit from "uikit";
import IsMobile from "@/services/mobile-check"
Vue.use(VueCompositionApi)

const api = "https://korean-war-alpha.firebaseio.com/DATA.json";

const warMap = reactive({
  init: {},
  markers: [],
  mapData: {},
  openList: false,
  monthSelected: "---전체---",
  mapDataList: [],
  count: 0,
  initMap() {
    warMap.init = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.5642135, lng: 127.0016985 },
      zoom: 7,
      disableDefaultUI: true
    });
  },
  drawMarkers(rdata, index) {
    warMap.markers[index] = new window.google.maps.Marker({
      id: index,
      position: new window.google.maps.LatLng(
        rdata.pos.split(",")[0],
        rdata.pos.split(",")[1]
      ),
      map: warMap.init,
      icon: warMap.whereIsWar(rdata.where),
      data: rdata
    });
    
    warMap.count++;

    const infoWindow = new window.google.maps.InfoWindow({
      content: `<p>전투명: ${rdata.title}</p>
                <p>날짜: ${rdata.date}</p>`
    });

    warMap.markers[index].addListener("click", function() {
      warMap.mapData = rdata;
      if(IsMobile.data) {
        warMap.openList = true;
        window.scrollTo({top:600, behddavior:'smooth'})
      } else {
        warMap.openList = false;
        UIkit.offcanvas('#offcanvas-map').show();
      }
    });
    warMap.markers[index].addListener("mouseover", function() {
      infoWindow.open(this.map, this);
    });
    warMap.markers[index].addListener("mouseout", function() {
      infoWindow.close();
    });
  },
  whereIsWar(where) {
    return where == "is_naval_warfare"
      ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
      : where == "is_air_war"
      ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      : "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
  },
  yearMonth(data) {
    const dateSplit = data.addtn_itm_2.split('-');
    return dateSplit[0].split('.')[0] +'년 '+
      dateSplit[0].split('.')[1] + '월';
  },
  monthChange() {
    warMap.initMap();
    warMap.count = 0;
    warMap.openList = false;
    if(warMap.monthSelected === "---전체---") {
      warMap.mapDataList.map((d,index) => {
        warMap.drawMarkers(d, index)
      })
    } else {
      warMap.mapDataList.map((d,index) => {
        if(warMap.monthSelected === d.ym) {
          warMap.drawMarkers(d, index)
        }
      })
    }
  },
  fetchData() {
    fetch(api)
      .then(res => {
        return res.json();
    }).then(j => {
      warMap.initMap();
      return j.map(data => {
        const ym = warMap.yearMonth(data);
        const {
          addtn_itm_2: date,
          addtn_itm_3: location,
          addtn_itm_4: cmmndr,
          addtn_itm_6: pos,
          addtn_itm_5: where,
          ctnt, title
        } = data;
        warMap.mapDataList.push({ date, location, cmmndr, pos, where, ctnt, title, ym })
      });
    }).then(() => {
      warMap.mapDataList.map((rdata, index) => {
        warMap.drawMarkers(rdata, index);
      });
    });
  }
});

warMap.fetchData();

export default warMap
