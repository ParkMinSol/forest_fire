var serverData = [
  {
    no: 1,
    time: "2022-5-3 18:23",
    place: "무등산",
  },
  {
    no: 2,
    time: "2022-5-3 18:23",
    place: "무등산",
  },
  {
    no: 3,
    time: "2022-5-3 18:23",
    place: "무등산",
  },
  {
    no: 4,
    time: "2022-5-3 18:23",
    place: "무등산",
  },
];

function toDOM(row) {
  var tr = "";
  tr += "<tr>";
  tr += "  <td>" + row.no + "</td>";
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
