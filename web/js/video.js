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
  // if (no === "1") {
  //   let _video = document.querySelector(".fire-info-video");
  //   _video.removeAttribute("src"); // src 프로퍼티를 제거
  //   _video.src = "video.mp4"; // 다른 미디어로 소스 변경
  //   _video.load(); // 새로운 정보를 다시 로드
  //   _video.play(); // 잘 동작함
  // } else if (no === "2") {
  //   let _video = document.querySelector(".fire-info-video");
  //   _video.removeAttribute("src"); // src 프로퍼티를 제거
  //   _video.src = "video2.mp4"; // 다른 미디어로 소스 변경
  //   _video.load(); // 새로운 정보를 다시 로드
  //   _video.play(); // 잘 동작함
  // } else {
  //   let _video = document.querySelector(".fire-info-video");
  //   _video.pause();
  //   _video.removeAttribute("src"); // src 프로퍼티를 제거
  // }
  listAlbums(no);

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
// iam - fireimgdataauth
//s3 - capston-input-data

var albumBucketName = "capston-input-data";

AWS.config.region = "ap-northeast-2"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "ap-northeast-2:f566bb0a-0aa3-4149-9b9a-3cbfd4fc4fd4",
});

// 서비스 객체 만들기
var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName },
});

// 코드가 들오면 줄바꿈 기호 해서 리턴
function getHtml(template) {
  return template.join("\n");
}
function listAlbums(no) {
  s3.listObjects({ Delimiter: "/" }, function (err, data) {
    if (err) {
      return alert("There was an error listing your albums: " + err.message);
    } else {
      // 앨범이름 따서 htmlTemplate으로 출력함
      var albums = data.CommonPrefixes.map(function (commonPrefix) {
        var prefix = commonPrefix.Prefix;
        var albumName = decodeURIComponent(prefix.replace("/", ""));
        // 앨범이름에 버킷 폴더명 들어감
        // console.log(prefix);
        // console.log(albumName);
        var albumPhotosKey = encodeURIComponent(albumName) + "/";

        s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
          if (err) {
            return alert(
              "There was an error viewing your album: " + err.message
            );
          }
          // 'this' references the AWS.Request instance that represents the response
          var href = this.request.httpRequest.endpoint.href;
          var bucketUrl = href + albumBucketName + "/";
          //   console.log(href);
          //   console.log(bucketUrl);

          //   버킷 주소
          //   no값에 맞는 이미지 불러오기
          var photoKey = albumName + `/${no}.png`;
          var photoUrl = bucketUrl + encodeURIComponent(photoKey);
          // var makeUrl = `https://s3.ap-northeast-2.amazonaws.com/capston-input-data/fireimg%2F${no}.png`;
          // console.log(makeUrl);
          var htmlTemplate =
            '<img id ="imgs" style="width:85%;" src="' + photoUrl + '"/>';

          console.log(htmlTemplate);
          document.getElementById("fire-info-img").innerHTML = htmlTemplate;
        });
      });
    }
  });
}
