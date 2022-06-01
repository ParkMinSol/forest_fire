const API_KEY = "fb483792d47d7f291fdbbb3e6b675610";
const COORDS = "coords";
const part = "current";

const loo = document.querySelector(".location-of-occurrence");
const temp = document.querySelector(".temp");

const humi = document.querySelector(".humi");
const wind = document.querySelector(".wind");
const weatherIconImg = document.querySelector("#weathericon");

function init() {
  askForCoords();
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

// function handleSuccess(position) {
//   var latitude = position.coords.latitude;
//   var longitude = position.coords.longitude;
//   var coordsObj = {
//     latitude,
//     longitude,
//   };
//   // console.log("성공했어!!");
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`;
//   // console.log(url);
//   getWeather(latitude, longitude); //얻은 좌표값을 바탕으로 날씨정보를 불러온다.
// }

function handleSuccess(lat, lon) {
  var latitude = lat;
  var longitude = lon;
  var coordsObj = {
    latitude,
    longitude,
  };
  // console.log("성공했어!!");
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`;
  console.log(url);
  getWeather(latitude, longitude); //얻은 좌표값을 바탕으로 날씨정보를 불러온다.
}

function handleError() {
  console.log("can't not access to location");
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    // `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      const winds = json.wind.speed;
      const weatherIcon = json.weather[0].icon;

      const humidity = json.main.humidity;
      // console.log(temperature + place + weatherDescription + weatherIcon);
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      loo.innerText = `${place}`;
      temp.innerText = `온도: ${temperature} °C`;

      humi.innerText = `습도: ${humidity} %`;
      wind.innerText = `풍속: ${winds} m/s`;
      weatherIconImg.setAttribute("src", weatherIconAdrs);
    })
    .catch((error) => console.log("error:", error));
}

// init();
