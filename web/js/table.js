var serverData = [
  {
    no: 1,
    time: "2022-5-3 18:23",
    place: "무등산",
    lat: 35.11808065061176,
    lon: 127.01091525393069,
  },
  {
    no: 2,
    time: "2022-5-4 20:53",
    place: "금당산",
    lat: 35.11702008072236,
    lon: 126.88822707820545,
  },
  {
    no: 3,
    time: "2022-5-5 13:21",
    place: "설악산",
    lat: 38.11699663261056,
    lon: 128.45535086707696,
  },
  {
    no: 4,
    time: "2022-5-8 09:48",
    place: "지리산",
    lat: 35.324789196534184,
    lon: 127.66492040955484,
  },
];
// 데이터가 없을때 정보없음 상태 표시
if (serverData.length == 0) {
  document.querySelector("#fire-info-text-table tbody").style.display = "none";
  document.querySelector("#fire-info-text-table").style.height = "20px";
  document.querySelector(".table-div").style.display = "flex";
}

// 테이블 만드는 함수
function toDOM(row) {
  var tr = "";
  tr += "<tr>";
  tr += "<td>" + row.no + "</td>";
  tr += "  <td>" + row.time + "</td>";
  tr += "  <td>" + row.place + "</td>";
  tr += "</tr>";
  return tr;
}
function renderTable(id, dataList) {
  var size = dataList.length;
  var trList = "";
  for (var i = 0; i < size; i++) {
    trList += toDOM(dataList[i]);
  }
  document.querySelector("#" + id + " tbody").innerHTML = trList;
}

window.onload = function () {
  renderTable("fire-info-text-table", serverData);
};

function send_lat() {
  return serverData[no - 1].lat;
}
4;
function send_lon() {
  return serverData[no - 1].lon;
}
