// 네이버
// var mapOptions = {
//   // 지도의 초기 중심좌표로 현재는 서울 시청좌표로 설정하고 초기 줌 레벨은 10
//   center: new naver.maps.LatLng(37.5666805, 126.9784147),
//   zoom: 16,
// };
// var map = new naver.maps.Map("map", mapOptions);

// 카카오
var container = document.getElementById("map");
var options = {
  center: new kakao.maps.LatLng(37.5666805, 126.9784147),
  level: 2,
};

var map = new kakao.maps.Map(container, options);

// Map 클래스의 객체를 map으로 선언 / 매개변수 1 : 지도를 표현하기위해 선언하였던 dom요소의 id인 map으로 직접전달 / 매개변수 2 : 지도속성 초기화를 위한 옵션 전달
function viewmap(map_lat, map_lon) {
  console.log(map_lat, map_lon);
  console.log(map_lat);
  options = {
    center: new kakao.maps.LatLng(map_lat, map_lon),
    level: 4,
  };
  map = new kakao.maps.Map(container, options);
  // 네이버지도 마커
  // var marker = new naver.maps.Marker({
  //   position: new naver.maps.LatLng(map_lat, map_lon),
  //   map: map,
  // });

  // 카카오지도 마커
  var markerPosition = new kakao.maps.LatLng(map_lat, map_lon);
  var marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
  console.log(map_lat, map_lon);
}
