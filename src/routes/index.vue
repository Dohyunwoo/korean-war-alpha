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
  import { reactive, onUpdated } from '@vue/composition-api';
  const api = 'https://korean-war-alpha.firebaseio.com/DATA.json' 

  export default {
    setup () {
      const map = reactive({                                                          // 맵 정보를 담고 있는 reactive(state)
        init: {},
        markers: {},
        default: { lat: 37.5642135, lng: 127.0016985 }                                // 서울 위경도 값
      });

      function initMap() {                                                            // 맵 initialize
        map.init = new window.google.maps.Map(document.getElementById('map'), {
          center: map.default,
          zoom: 8
        });
      }
      window.koreanwar = initMap                                                      // /public/index.html에 스크립트에서 해당 함수를 사용하기 위해 추가된 소스코드
      
      fetch(api).then(res => { return res.json()}).then(j => {                        // firebase의 api를 땡겨와 json으로 변환하는 코드
        return j.map(data => { return {'address': data.addtn_itm_3} })                // 변환된 json 데이터를 geocode에서 사용하기 위한 데이터 셋으로 변환
      }).then(ds => {
        new window.google.maps.Geocoder().geocode(ds[0], (results, status) => {       // geocode 함수 호출 첫 번째 인자로 데이터 셋 중에 첫 번 째 index만을 가져오기위해 ds[0]만 넘겨줌
          if(results!=""){                                                            // geocode 예제 코드 참조함
            const location=results[0].geometry.location;
            const lat=location.lat();
            const lng=location.lng(); 
            map.markers = new window.google.maps.Marker({                             //  실제 마커를 생성하는 코드
              id:1,
              position: new window.google.maps.LatLng(lat, lng),
              map: map.init
            });
          }
        })
      });
      return { map }
    }
  }
</script>
