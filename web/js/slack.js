function submitForm() {
  var message = document.querySelector(".fire-info-message").value;
  var area = document.getElementById("select-fire-area").value;
  var xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://hooks.slack.com/services/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",
    true
  );

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      // Request finished. Do processing here.
    }
  };
  var payload = {
    text: "화재 발생",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "화재 발생 !!! 확인 부탁드립니다.",
        },
      },
      {
        type: "section",
        block_id: "section123",
        fields: [
          {
            type: "mrkdwn",
            text: "*위치*\n" + area + "\n\n*추가정보*\n" + message + "\n\n",
          },
        ],
      },
    ],
  };
  xhr.send(JSON.stringify(payload));
}
