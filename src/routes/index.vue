<template>
  <div class="uk-container uk-container-small">
    <div class="uk-flex uk-margin-top uk-margin-bottom">
      <div>
        <span class="uk-label uk-label-danger">지상전</span> :
        <img
          data-src="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
          width="25"
          height="25"
          alt="지상전 이미지"
          uk-img
        />
      </div>
      <div class="uk-margin-left">
        <span class="uk-label">공중전</span> :
        <img
          data-src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          width="25"
          height="25"
          alt="공중전 이미지"
          uk-img
        />
      </div>
      <div class="uk-margin-left">
        <span class="uk-label uk-label-success">해상전</span> :
        <img
          data-src="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
          width="25"
          height="25"
          alt="해상전 이미지"
          uk-img
        />
      </div>
    </div>
    <div id="map" style="width:100%; height: 500px"></div>
    <div
      id="dataview"
      style="margin-top:20px;position:relative;width:100%; height: 500px;display:none"
    >
      <h2>지휘관 성명</h2>
      <div style="height:100px;">
        <table border="1">
          <tr>
            <th>당시계급</th>
            <th>현계급</th>
          </tr>
          <tr style="text-align:center">
            <td>
              <img id="prank_img" />
            </td>
            <td>
              <img id="crank_img" />
            </td>
          </tr>
          <tr style="text-align:center">
            <td>
              <p id="pcmmdNM" style="display:inline;"></p>
            </td>
            <td>
              <p id="ccmmdNM" style="display:inline;"></p>
            </td>
          </tr>
        </table>
      </div>
      <h2>훈장</h2>
      <div id="dcrtn"></div>
      <h2>내용</h2>
      <p id="ctnt"></p>
    </div>
    <div id="offcanvas-map" uk-offcanvas="mode: reveal">
      <div class="uk-offcanvas-bar">
        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <h2>타이틀</h2>
        <p>{{ warMap.mapData.title }}</p>
        <h2>날 짜</h2>
        <p>{{ warMap.mapData.date }}</p>
        <h2>격전지</h2>
        <p>{{ warMap.mapData.location }}</p>
        <h2>사령관</h2>
        <ul id="ulCmmd"></ul>

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
const hogukapi = "https://korean-war-alpha-cdr.firebaseio.com/DATA.json";

export default {
  setup() {
    const warMap = reactive({
      init: {},
      markers: [],
      mapData: {},
      hugukData: []
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
        document.getElementById("dataview").style.display = "none";
        var str = rdata.cmmndr.split(",");
        // rdata.cmmndr = str;
        // this.cmmd = str;
        var ptag = document.getElementById("ulCmmd");
        while (ptag.hasChildNodes()) {
          ptag.removeChild(ptag.firstChild);
        }
        for (var i = 0; i < str.length; i++) {
          document.getElementById("ulCmmd").style.listStyle = "none";
          var litag = document.createElement("li");

          var atag = document.createElement("a");
          atag.onclick = function() {
            var imsi = this.innerText.split(" ");

            var index = warMap.hugukData.findIndex(function(item) {
              return item.who.split(" ")[0] === imsi[0];
            });

            if (index != -1) {
              clearHuguk();
              document.getElementById("pcmmdNM").innerText = this.innerText;
              document.getElementById("ccmmdNM").innerText =
                warMap.hugukData[index].who;

              var prankNM = this.innerText.split(" ");
              var prank;
              if (prankNM.length > 2) {
                prank = this.innerText.split(" ")[2];
              } else {
                prank = this.innerText.split(" ")[1];
              }
              document
                .getElementById("prank_img")
                .setAttribute("src", "/images/rank/" + prank + ".gif");
              document
                .getElementById("crank_img")
                .setAttribute(
                  "src",
                  "/images/rank/" +
                    warMap.hugukData[index].rank_nm.split(" ")[1] +
                    ".gif"
                );
              var dcrtns = warMap.hugukData[index].dcrtn.split(", ");

              if (dcrtns.length > 1) {
                for (var i = 0; i < dcrtns.length; i++) {
                  var newimg = document.createElement("img");
                  newimg.setAttribute(
                    "src",
                    "/images/honor/" + dcrtns[i] + ".png"
                  );
                  newimg.style.maxHeight = "100px";
                  newimg.style.maxWidth = "200px";
                  document.getElementById("dcrtn").appendChild(newimg);
                  var newps = document.createElement("p");

                  newps.innerText = dcrtns[i];

                  document.getElementById("dcrtn").appendChild(newps);
                }
              } else {
                var Objimg = new Image();
                Objimg.onload = function() {
                  var newimg = document.createElement("img");
                  newimg.setAttribute(
                    "src",
                    "/images/honor/" + dcrtns + ".png"
                  );
                  document.getElementById("dcrtn").appendChild(newimg);
                };
                Objimg.src = "/images/honor/" + dcrtns + ".png";
                var newp = document.createElement("p");

                newp.innerText = dcrtns;

                document.getElementById("dcrtn").appendChild(newp);
              }
              document.getElementById("ctnt").innerHTML =
                warMap.hugukData[index].ctnt;
              document.getElementById("dataview").style.display =
                "inline-block";
              console.log(
                "호국선열 대상 " + JSON.stringify(warMap.hugukData[index])
              );
            } else {
              clearHuguk();
              alert("호국선열 대상자가 아닙니다.");
              console.log("호국선열 대상 아님");
            }
          };
          var text = document.createTextNode(str[i]);

          atag.appendChild(text);
          litag.appendChild(atag);
          document.getElementById("ulCmmd").appendChild(litag);
        }
        // console.log(this.cmmd[0]);
        warMap.mapData = rdata;

        UIkit.offcanvas("#offcanvas-map").show();
      });
      warMap.markers[index].addListener("mouseover", function() {
        infoWindow.open(this.map, this);
      });
      warMap.markers[index].addListener("mouseout", function() {
        infoWindow.close();
      });
    }

    function clearHuguk() {
      document.getElementById("pcmmdNM").innerText = "";
      document.getElementById("ccmmdNM").innerText = "";
      var cell = document.getElementById("dcrtn");

      while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }
      document.getElementById("prank_img").setAttribute("src", "");
      document.getElementById("crank_img").setAttribute("src", "");

      document.getElementById("ctnt").innerHTML = "";
      document.getElementById("dataview").style.display = "none";
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
            ctnt: info,
            title
          } = data;
          return { date, location, cmmndr, pos, where, info, title };
        });
      })
      .then(ds => {
        ds.map((rdata, index) => {
          drawMarkers(rdata, index);
        });
      });

    fetch(api_un) //외국군
      .then(res => {
        return res.json();
      })
      .then(j => {
        console.log(j);
        // initMap();
        // return j.map(data => {
        //   const {
        //     addtn_itm_2: date,
        //     addtn_itm_3: location,
        //     addtn_itm_4: cmmndr,
        //     addtn_itm_6: pos,
        //     addtn_itm_5: where,
        //     ctnt:info, title
        //   } = data;
        //   return { date, location, cmmndr, pos, where, info, title }
        // });
      })
      .then(ds => {
        // ds.map((rdata, index) => {
        //   drawMarkers(rdata, index);
        // });
      });

    fetch(hogukapi) //외국군
      .then(res => {
        return res.json();
      })
      .then(j => {
        // console.log(j);
        // initMap();
        return j.map(data => {
          const {
            title: who, //사람
            addtn_itm_7: rank_nm, //계급
            addtn_itm_8: dcrtn, //훈장
            addtn_itm_6: where, //태어난곳
            ctnt: ctnt
          } = data;
          return { who, rank_nm, dcrtn, where, ctnt };
        });
      })
      .then(ds => {
        warMap.hugukData = ds;
        // console.log(ds);
        // ds.map((rdata, index) => {
        //   this.huguk[index] = rdata;
        // });
      });

    return { warMap };
  },
  methods: {
    doClick: function() {
      return;
    }
  }
};
</script>
