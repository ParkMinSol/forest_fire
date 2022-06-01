// 서버에서 값이 올때
// 변수에 값을 넣음
var inputdata = "1_35.11808065061176_127.01091525393069";

// 확인
var data = inputdata.split("_");

// 좌표로 주소 변환해 테이블에 추가
getAddr(data[1], data[2]);
function getAddr(newlat, newlon) {
  var geocoder = new kakao.maps.services.Geocoder();
  let coord = new kakao.maps.LatLng(newlat, newlon);
  let callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      //   console.log(result[0].address.address_name);
      var address = result[0].address.address_name;
      console.log(address);

      var today = new Date();
      var aJson = new Object();
      aJson.no = Number(data[0]);
      aJson.time = today.toLocaleString();
      aJson.place = address;
      aJson.lat = data[1];
      aJson.lon = data[2];
      console.log(aJson);
      serverData.push(aJson);

      plusdata = toDOM(aJson);
      //   테이블에 추가하기위한 부분
      $("#fire-info-text-table> tbody:last-child").append(plusdata);
      console.log(serverData);
    }
  };
  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}
