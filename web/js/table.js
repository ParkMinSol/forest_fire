// lambda - readDataFromDB, apigateway - readDataFromDB-API
var serverData = [];

// 테이블 만드는 함수
function toDOM(row) {
  var tr = "";
  tr += "<tr>";
  tr += "<td>" + row.number + "</td>";
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
  $.ajax({
    url: "https://fcd4shenp8.execute-api.ap-northeast-2.amazonaws.com/readData/readDataFromDB?TableName=fireInformation",
    type: "GET",
    contentType: "application/json",
    mimeType: "application/json",
    success: function (retVal) {
      console.log(retVal);
      var items = retVal.Items;
      // 받은 데이터 number순으로 정렬
      console.log(typeof items);
      serverData = items.sort(function (a, b) {
        return a.number - b.number;
      });

      console.log(serverData);
      // 데이터가 없을때 정보없음 상태 표시
      if (serverData.length == 0) {
        document.querySelector("#fire-info-text-table tbody").style.display =
          "none";
        document.querySelector("#fire-info-text-table").style.height = "20px";
        document.querySelector(".table-div").style.display = "flex";
      }
      // 데이터가 있는 경우 테이블 생성
      else {
        renderTable("fire-info-text-table", serverData);
        var count = retVal.ScannedCount;
        var result = "";
        for (var i = 0; i < count; i++) {
          var row = items[i].place;
          var selectdata = `<option value="${row}"> ${row}</option>`;
          $("#select-fire-area").append(selectdata);
        }
      }
    },
    error: function (retVal, status, er) {
      alert("에러발생");
    },
  });
};

function send_lat() {
  return serverData[no - 1].lat;
}
4;
function send_lon() {
  return serverData[no - 1].lon;
}
