var serverData = [
  {
    no: 1,
    time: "2022-5-3 18:23",
    place: "무등산",
  },
  {
    no: 2,
    time: "2022-5-4 20:53",
    place: "금당산",
  },
  {
    no: 3,
    time: "2022-5-5 13:21",
    place: "설악산",
  },
  {
    no: 4,
    time: "2022-5-8 09:48",
    place: "도봉산",
  },
];

function toDOM(row) {
  var tr = "";
  tr += "<tr>";
  tr += '<td onclick="showVideo()">' + row.no + "</td>";
  tr += "  <td>" + row.time + "</td>";
  tr += '  <td onclick="showMap()">' + row.place + "</td>";
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
function showVideo() {
  var targetmap = document.querySelector(".fire-info-map");
  var targetvideo = document.querySelector(".fire-info-vw");

  targetmap.style.display = "none";
  targetvideo.style.display = "block";
}
function showMap() {
  var targetmap = document.querySelector(".fire-info-map");
  var targetvideo = document.querySelector(".fire-info-vw");
  targetvideo.style.display = "none";
  targetmap.style.display = "block";
}
// // 테이블의 Row 클릭시 값 가져오기
// $("#fire-info-text-table tr").click(function () {
//   var str = "";
//   var tdArr = new Array(); // 배열 선언

//   // 현재 클릭된 Row(<tr>)
//   var tr = $(this);
//   var td = tr.children();

//   // tr.text()는 클릭된 Row 즉 tr에 있는 모든 값을 가져온다.
//   console.log("클릭한 Row의 모든 데이터 : " + tr.text());

//   // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
//   td.each(function (i) {
//     tdArr.push(td.eq(i).text());
//   });

//   console.log("배열에 담긴 값 : " + tdArr);

//   // td.eq(index)를 통해 값을 가져올 수도 있다.
//   var no = td.eq(0).text();
//   var userid = td.eq(1).text();
//   var name = td.eq(2).text();
//   console.log(no + userid + name);
// });
