// 서버에서 값이 올때  함수에 아래 세개 추가
// 변수에 값을 넣음
var inputdata = "1_35.11808065061176_127.01091525393069";

// 확인
var data = inputdata.split("_");
getAddr(data[1], data[2]);

// 좌표로 주소 변환해 테이블에 추가

function getAddr(newlat, newlon) {
  var geocoder = new kakao.maps.services.Geocoder();
  let coord = new kakao.maps.LatLng(newlat, newlon);
  let callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      //   console.log(result[0].address.address_name);
      var address = result[0].address.address_name;

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
      console.log(plusdata);
      // 빈테이블에 처음 데이터가 들어갈때
      if (serverData.length == 1) {
        document.querySelector("#fire-info-text-table tbody").style.display =
          "table-row-group";
        document.querySelector(".table-div").style.display = "none";
        document.querySelector("#fire-info-text-table").style.height = "300px";
        renderTable("fire-info-text-table", serverData);
      }

      //  기존 테이블에 다른 데이터가 추가될 때
      else {
        $("#fire-info-text-table> tbody:last-child").append(plusdata);
        console.log(serverData);
      }
    }
  };
  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}
