var no;
// 버튼 클릭시 Row 값 가져오기
$(document).on("click", ".fire-info-text-table tbody tr td", function () {
  // 현재 클릭된 Row(<tr>)
  var tr = $(this);

  console.log("클릭한 Row의 모든 데이터 : " + tr.text());

  no = tr.text();
  // console.log(no);
  if (isNaN(no) == false) {
    showVideo();
  } else {
    showMap();
  }
});

// 테이블 값에 따른 영상을 보여주는 파트
function showVideo() {
  if (no === "1") {
    console.log("text");
    console.log(no);
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
  var targetmap = document.querySelector(".fire-info-map");
  var targetvideo = document.querySelector(".fire-info-vw");
  targetmap.style.display = "none";
  targetvideo.style.display = "block";
}

// 테이블 값에 따른 지도를 보여주는 파트
function showMap() {
  var targetmap = document.querySelector(".fire-info-map");
  var targetvideo = document.querySelector(".fire-info-vw");
  targetvideo.style.display = "none";
  targetmap.style.display = "block";
}
