// jQuery is required to run this code
$( document ).ready(function() {

  // weather app code
  let selected = document.querySelector('.day__block--selected')
  let days = document.querySelectorAll('.day__block');
  let todayTemp = document.querySelector('.weather-temp--today');
  let todayIcon = document.querySelector('.weather__icon--today');

  function refreshTemp() {
    todayTemp.innerHTML = this.getAttribute('max');
    document.querySelector('.day__block--selected').classList.remove('day__block--selected');
    this.classList.add('day__block--selected');

    let iconPath = 'images/' + this.getAttribute('conditions') + '.png';
    todayIcon.setAttribute('src', iconPath);
  };

  days.forEach(function(day, index) {
    day.addEventListener('click', refreshTemp);
  });

  //video banner code
  
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

