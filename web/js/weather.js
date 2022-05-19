const API_KEY = "e39dfe82cef428c7462d1633623c65f7";
const COORDS = "coords";

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

function handleSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
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

init();
