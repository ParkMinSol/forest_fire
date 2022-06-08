// const AWS = require("aws-sdk");

// const tableName = "fireInformation";
// const key = {
//   accessKeyId: "AKIAXCNEVF2DUPXY3Z3K",
//   secretAccessKey: "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",
//   region: "ap-northeast-2",
// };

// AWS.config.update(key);
// const dynamoDB = new AWS.DynamoDB.DocumentClient();

let timerId = setInterval(
  () =>
    $.ajax({
      url: "https://fcd4shenp8.execute-api.ap-northeast-2.amazonaws.com/readData/readDataFromDB?TableName=fireInformation",
      type: "GET",
      contentType: "application/json",
      mimeType: "application/json",
      success: function (retVal) {
        var items = retVal.Items;
        // 받은 데이터 number순으로 정렬
        serverData = items.sort(function (a, b) {
          return a.number - b.number;
        });
        console.log(serverData.length);
        console.log(tableLength);
        // 데이터가 없을때 정보없음 상태 표시
        if (serverData.length == 0) {
          document.querySelector("#fire-info-text-table tbody").style.display =
            "none";
          document.querySelector("#fire-info-text-table").style.height = "20px";
          document.querySelector(".table-div").style.display = "flex";
        } else if (serverData.length > tableLength) {
          renderTable("fire-info-text-table", serverData);
          var count = retVal.ScannedCount;
          tableLength = retVal.ScannedCount + 1;
          console.log("e1");
          $("#select-fire-area").children("option:not(:first)").remove();
          for (var i = 0; i < count; i++) {
            var row = items[i].place;
            var selectdata = `<option value="${row}"> ${row}</option>`;
            $("#select-fire-area").append(selectdata);
          }
          // getAddr(
          //   serverData[serverData.length - 1].lat,
          //   serverData[serverData.length - 1].lon,
          //   serverData[serverData.length - 1].number
          // );
        } else if (serverData.length < tableLength) {
          renderTable("fire-info-text-table", serverData);
          var count = retVal.ScannedCount;
          var result = "";
          tableLength = retVal.ScannedCount;
          console.log("e2");
          $("#select-fire-area").children("option:not(:first)").remove();
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
    }),
  1000
);
// 좌표로 주소 변환해 테이블에 추가

// function getAddr(newlat, newlon, no) {
//   var geocoder = new kakao.maps.services.Geocoder();
//   let coord = new kakao.maps.LatLng(newlat, newlon);
//   let callback = function (result, status) {
//     if (status === kakao.maps.services.Status.OK) {
//       //   console.log(result[0].address.address_name);
//       var address = result[0].address.address_name;

//       var today = new Date();
//       var aJson = new Object();
//       aJson.number = Number(no);
//       aJson.time = today.toLocaleString();
//       aJson.place = address;
//       aJson.lat = newlat;
//       aJson.lon = newlon;

//       serverData.push(aJson);
//       plusdata = toDOM(aJson);

//       const update = {
//         TableName: tableName,
//         Key: { idx: no },
//         UpdateExpression: "set place = :d1",
//         ExpressionAttributeValues: {
//           ":d1": address,
//         },
//       };

//       dynamoDB.update(update, (e, d) => {
//         console.log(e, d);
//       });
//       // 빈테이블에 처음 데이터가 들어갈때
//       if (serverData.length == 1) {
//         document.querySelector("#fire-info-text-table tbody").style.display =
//           "table-row-group";
//         document.querySelector(".table-div").style.display = "none";
//         document.querySelector("#fire-info-text-table").style.height = "300px";
//         renderTable("fire-info-text-table", serverData);
//       }

//       //  기존 테이블에 다른 데이터가 추가될 때
//       else {
//         $("#fire-info-text-table> tbody:last-child").append(plusdata);
//       }
//       var selectdata = `<option value="${address}"> ${address}</option>`;
//       $("#select-fire-area").append(selectdata);
//     }
//   };
//   geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
// }
