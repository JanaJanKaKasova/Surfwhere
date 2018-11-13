// jQuery is required to run this code
// this whole code is for the cover
$( document ).ready(function() {
    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
      scaleVideoContainer();
      scaleBannerVideoSize('.video-container .poster img');
      scaleBannerVideoSize('.video-container .filter');
      scaleBannerVideoSize('.video-container video');
    });
  });

  function scaleVideoContainer() {
    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);
  }

  function initBannerVideoSize(element){
    $(element).each(function(){
      $(this).data('height', $(this).height());
      $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);
  }

  function scaleBannerVideoSize(element) {

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    // console.log(windowHeight);

    $(element).each(function(){
      var videoAspectRatio = $(this).data('height')/$(this).data('width');

      $(this).width(windowWidth);

      if(windowWidth < 1000){
          videoHeight = windowHeight;
          videoWidth = videoHeight / videoAspectRatio;
          $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

          $(this).width(videoWidth).height(videoHeight);
      }

      $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
  }


//the following code is for the actual temperature navbar
/*$ (document.getElementsById ('actualweather'))
  var temp;
  var loc;
  var day;
  var date;
  var icon;
  var wind;
  var direction;

  function update(weather) {
    temp.innerHTML = weather.temp;
    loc.innerHTML = weather.loc;
    day.innerHTML = weather.day;
    date.innerHTML = weather.date;
    icon.href = "https://use.fontawesome.com/releases/v5.4.1/css/all.css";
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
  }

  window.onload = function () {
    temp = document.getElementById('temperature');
    loc = document.getElementById('location'); 
    day = document.getElementById('day');
    date = document.getElementById('date');
    icon = document.getElementById('icon');
    wind = document.getElementById('wind');
    direction = document.getElementById('direction');

    var weather = ();
    weather.temp = 20;
    weather.loc = 'Lisbon';
    weather.day = 'Monday';
    weather.date = '12.11.';
    weather.icon = main-fa-cloud-sun;
    weather.wind = 5;
    weather.direction = N;

    update (weather);
  } 
*/
