// jQuery is required to run this code
$(document).ready(function() {
  //DOM Elements
  let date = document.querySelector("#weather-date");
  let days = document.querySelectorAll(".day__block");
  let temperature = document.querySelector(".weather-temp--today");
  let wind = document.querySelector("#wind-speed");
  let precipitation = document.querySelector("#precipitation-probality");
  let direction = document.querySelector("#wind-direction");
  let description = document.querySelector("#weather-description");
  let place = document.querySelector("#weather-location");
  let icon = document.querySelector(".weather__icon--today");
  let form = document.querySelector("#weather__form");
  let formLocation = form.querySelector("#weather__form-location");

  //OpenWeather API
  let root = "https://api.openweathermap.org";
  let apiKey = "029474316bb793be56fc4dee0d85fa00";

  //making the date friendly
  function friendlyDate(date) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;

    return days[date.getDay()] + " " + date.getHours() + ":" + minutes;
  }

  function refreshWeather(queryParams) {
    let apiParams = "appid=" + apiKey + "&units=metric";
    axios
      .get(root + "/data/2.5/weather?" + apiParams + "&" + queryParams)
      .then(function(response) {
        date.innerHTML = friendlyDate(new Date());
        place.innerHTML = response.data.name;
        description.innerHTML = response.data.weather[0].main;
        temperature.innerHTML = Math.round(response.data.main.temp);
        wind.innerHTML = Math.round(response.data.wind.speed);
        direction.innerHTML = Math.round(response.data.wind.deg) + "°";
        precipitation.innerHTML = Math.round(response.data.main.humidity);

        icon.setAttribute(
          "src",
          "http://openweathermap.org/img/w/" +
            response.data.weather[0].icon +
            ".png"
        );
      });

    //previous code for geolocation before all
    /*navigator.geolocation.getCurrentPosition(function(position) {
    function refreshWeather(query) {
      axios.get(root + '/data/2.5/weather?' + query)
        .then(function (response) {

        date.innerHTML = friendlyDate(new Date());
        place.innerHTML = response.data.name;
        description.innerHTML = response.data.weather[0].main;
        temperature.innerHTML = Math.round(response.data.main.temp);
        wind.innerHTML = Math.round(response.data.wind.speed);
        direction.innerHTML = Math.round(response.data.wind.deg) + '°';
        precipitation.innerHTML = Math.round(response.data.main.humidity);
        icon.setAttribute('src', 'http://openweathermap.org/img/w/' + response.data.weather[0].icon + '.png')
      });  */

    axios
      .get(root + "/data/2.5/forecast?" + apiParams + "&" + queryParams)
      .then(function(response) {
        document
          .querySelectorAll(".day__block")
          .forEach(function(element, index) {
            let day = new Date(response.data.list[index].dt_txt);
            element.querySelector(".day__block-date").innerHTML = friendlyDate(
              day
            );
            element.querySelector(
              ".day__block-temp--max"
            ).innerHTML = Math.round(response.data.list[index].main.temp_max);
            element.querySelector(
              ".day__block-temp--min"
            ).innerHTML = Math.round(response.data.list[index].main.temp_min);
            element
              .querySelector(".day__block-image")
              .setAttribute(
                "src",
                "http://openweathermap.org/img/w/" +
                  response.data.list[index].weather[0].icon +
                  ".png"
              );
            element.querySelector(".wind-speed").innerHTML = Math.round(
              response.data.list[index].wind.speed
            );
            element.querySelector("#weather-description").innerHTML =
              response.data.list[index].weather[0].main;
          });
      });
  }

  form.addEventListener("submit", function(event) {
    refreshWeather("q=" + form.querySelector("#weather__form-location").value);
    event.preventDefault();
  });

  refreshBtn.addEventListener("click", function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      refreshWeather(
        "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude
      );
    });
  });

  refreshWeather("q=Lisbon");

  // weather app code podle sup-master for selectors
  /*let selected = document.querySelector('.day__block--selected')
  let days = document.querySelectorAll('.day__block');
  let todayTemp = document.querySelector('.weather-temp--today');
  let todayIcon = document.querySelector('.weather__icon--today');

  function refreshTemp() {
    todayTemp.innerHTML = this.getAttribute('max');
    document.querySelector('.day__block--selected').classList.remove('day__block--selected');
    this.classList.add('day__block--selected');

    let iconPath = '' + this.getAttribute('conditions');
    todayIcon.setAttribute('src', iconPath);
  };

  days.forEach(function(day, index) {
    day.addEventListener('click', refreshTemp);
  });*/

  //video banner code

  scaleVideoContainer();

  initBannerVideoSize(".video-container .poster img");
  initBannerVideoSize(".video-container .filter");
  initBannerVideoSize(".video-container video");

  $(window).on("resize", function() {
    scaleVideoContainer();
    scaleBannerVideoSize(".video-container .poster img");
    scaleBannerVideoSize(".video-container .filter");
    scaleBannerVideoSize(".video-container video");
  });
});

function scaleVideoContainer() {
  var height = $(window).height() + 5;
  var unitHeight = parseInt(height) + "px";
  $(".homepage-hero-module").css("height", unitHeight);
}

function initBannerVideoSize(element) {
  $(element).each(function() {
    $(this).data("height", $(this).height());
    $(this).data("width", $(this).width());
  });

  scaleBannerVideoSize(element);
}

function scaleBannerVideoSize(element) {
  var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

  // console.log(windowHeight);

  $(element).each(function() {
    var videoAspectRatio = $(this).data("height") / $(this).data("width");

    $(this).width(windowWidth);

    if (windowWidth < 1000) {
      videoHeight = windowHeight;
      videoWidth = videoHeight / videoAspectRatio;
      $(this).css({
        "margin-top": 0,
        "margin-left": -(videoWidth - windowWidth) / 2 + "px"
      });

      $(this)
        .width(videoWidth)
        .height(videoHeight);
    }

    $(".homepage-hero-module .video-container video").addClass(
      "fadeIn animated"
    );
  });
}
