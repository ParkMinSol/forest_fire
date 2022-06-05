var no;
var occurrencetime;
var occurrenceplace;
// 버튼 클릭시 Row 값 가져오기
$(document).on("click", ".fire-info-text-table tbody tr td", function () {
  var td = $(this);
  var tr = td.parents();
  var trch = tr.children();
  if (isNaN(td.text()) == false) {
    no = trch.eq(0).text();
    occurrencetime = trch.eq(1).text();
    occurrenceplace = trch.eq(2).text();
    showVideo();
  } else {
    no = trch.eq(0).text();
    occurrencetime = trch.eq(1).text();
    occurrenceplace = trch.eq(2).text();
    showMap();
  }
});

// 테이블 값에 따른 영상을 보여주는 파트
function showVideo() {
  if (no === "1") {
    let _video = document.querySelector(".fire-info-video");
    _video.removeAttribute("src"); // src 프로퍼티를 제거
    _video.src = "video.mp4"; // 다른 미디어로 소스 변경
    _video.load(); // 새로운 정보를 다시 로드
    _video.play(); // 잘 동작함
  } else if (no === "2") {
    let _video = document.querySelector(".fire-info-video");
    _video.removeAttribute("src"); // src 프로퍼티를 제거
    _video.src = "video2.mp4"; // 다른 미디어로 소스 변경
    _video.load(); // 새로운 정보를 다시 로드
    _video.play(); // 잘 동작함
  } else {
    let _video = document.querySelector(".fire-info-video");
    _video.pause();
    _video.removeAttribute("src"); // src 프로퍼티를 제거
  }

  // 날씨정보
  var map_lat = send_lat(no);
  var map_lon = send_lon(no);
  handleSuccess(map_lat, map_lon);
  var targetmap = document.querySelector(".fire-info-map");
  var targetvideo = document.querySelector(".fire-info-vw");
  targetmap.style.display = "none";
  targetvideo.style.display = "block";
}

// 테이블 값에 따른 지도를 보여주는 파트
function showMap() {
  // console.log(no);
  // console.log(occurrenceplace);
  // console.log(occurrencetime);
  // 위도경도값 받아와서 지도에 표현
  var map_lat = send_lat(no);
  var map_lon = send_lon(no);
  viewmap(map_lat, map_lon);

  // 필요한 부분만 보이도록 설정
  var targetmap = document.querySelector(".fire-info-map");
  var targetvideo = document.querySelector(".fire-info-vw");
  targetvideo.style.display = "none";
  targetmap.style.display = "block";
}
