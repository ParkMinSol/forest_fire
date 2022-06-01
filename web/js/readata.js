// 서버에서 값이 올때  함수에 아래 세개 추가
// 변수에 값을 넣음
var inputdata = "1_35.11808065061176_127.01091525393069";
var data = inputdata.split("_");
getAddr(data[1], data[2], data[0]);

setTimeout(function () {
  var inputdata2 = "2_35.324789196534184_127.66492040955484";
  var data2 = inputdata2.split("_");
  getAddr(data2[1], data2[2], data2[0]);
}, 3000);
setTimeout(function () {
  var inputdata3 = "3_35.11702008072236_126.88822707820545";
  var data3 = inputdata3.split("_");
  getAddr(data3[1], data3[2], data3[0]);
}, 4000);

// 좌표로 주소 변환해 테이블에 추가

function getAddr(newlat, newlon, no) {
  var geocoder = new kakao.maps.services.Geocoder();
  let coord = new kakao.maps.LatLng(newlat, newlon);
  let callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      //   console.log(result[0].address.address_name);
      var address = result[0].address.address_name;

      var today = new Date();
      var aJson = new Object();
      aJson.no = Number(no);
      aJson.time = today.toLocaleString();
      aJson.place = address;
      aJson.lat = newlat;
      aJson.lon = newlon;

      serverData.push(aJson);
      plusdata = toDOM(aJson);

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
      }
      var selectdata = `<option value="${address}"> ${address}</option>`;
      $("#select-fire-area").append(selectdata);
      storage.setItem("savedata", serverData);
    }
  };
  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}
