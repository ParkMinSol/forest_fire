var mapOptions = {
  // 지도의 초기 중심좌표로 현재는 서울 시청좌표로 설정하고 초기 줌 레벨은 10
  center: new naver.maps.LatLng(37.3595704, 127.105399),
  zoom: 10,
};
var map = new naver.maps.Map("map", mapOptions);
// Map 클래스의 객체를 map으로 선언 / 매개변수 1 : 지도를 표현하기위해 선언하였던 dom요소의 id인 map으로 직접전달 / 매개변수 2 : 지도속성 초기화를 위한 옵션 전달
