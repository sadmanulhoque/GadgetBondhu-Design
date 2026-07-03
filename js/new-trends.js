/**
 * new-trends.js
 * Initialises the Slick carousel for the New Trends section.
 */
(function ($) {
  'use strict';

  $(document).ready(function () {

    var $slider = $('.new-trends-slick');

    if (!$slider.length || !$.fn.slick) return;

    $slider.slick({
      slidesToShow   : 5,
      slidesToScroll : 2,
      infinite       : false,
      speed          : 400,
      cssEase        : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      arrows         : false,
      dots           : false,
      swipe          : true,
      touchThreshold : 10,
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 3 }
        },
        {
          breakpoint: 900,
          settings: { slidesToShow: 2 }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow  : 2,
            centerMode    : false
          }
        }
      ]
    });

    $('#new-trends-prev').on('click', function () {
      $slider.slick('slickPrev');
    });

    $('#new-trends-next').on('click', function () {
      $slider.slick('slickNext');
    });

  });

}(jQuery));