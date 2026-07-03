/**
 * hero-slider.js
 * Initialises the Slick carousel for the hero banner.
 * Depends on: jQuery, slick-carousel (both loaded before this file).
 */
(function ($) {
  'use strict';

  $(document).ready(function () {

    var $slider = $('.hero-slick');

    // Guard: only run if the element and Slick are present
    if (!$slider.length || !$.fn.slick) return;

    $slider.slick({
      autoplay          : true,
      autoplaySpeed     : 5000,
      speed             : 500,
      cssEase           : 'ease',
      infinite          : true,
      arrows            : true,
      prevArrow         : '<button class="hero-arrow hero-arrow-prev" aria-label="Previous slide"><i class="fas fa-chevron-left"></i></button>',
      nextArrow         : '<button class="hero-arrow hero-arrow-next" aria-label="Next slide"><i class="fas fa-chevron-right"></i></button>',
      dots: true,
      dotsClass: 'hero-dots',
      appendDots: '.hero-slider',
      pauseOnHover      : true,
      pauseOnFocus      : false,
      swipe             : true,
      touchThreshold    : 10,
      adaptiveHeight    : false
    });

  });

}(jQuery));