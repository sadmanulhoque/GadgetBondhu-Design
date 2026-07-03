/* ============================================================
   GALLERY SLIDER — gallery.js
   Requires: jQuery, Slick Carousel
   ============================================================ */

$(function () {

  var $main   = $('.gallery-main-slider');
  var $thumbs = $('.gallery-thumbs-slider');

  /* ── Main image slider ── */
  $main.slick({
    slidesToShow:   1,
    slidesToScroll: 1,
    arrows:         false,
    dots:           false,
    fade:           false,
    infinite:       true,
    rtl:            false,
    autoplay:       true,
    autoplaySpeed:  1500,
    speed:          500,
    cssEase:        'linear',
  });

  /* ── Thumbnail slider (no asNavFor to prevent physical sliding) ── */
  $thumbs.slick({
    slidesToShow:   5,
    slidesToScroll: 1,
    arrows:         false,
    dots:           false,
    infinite:       false,
    rtl:            false,
    focusOnSelect:  false,
    useTransform:   false,
    variableWidth:  true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } },
    ],
  });

  /* Custom Sync: Main -> Thumbs (update active class) */
  $main.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $thumbs.find('.slick-slide').removeClass('slick-current slick-active');
    $thumbs.find('.slick-slide[data-slick-index="' + nextSlide + '"]').addClass('slick-current slick-active');
  });

  /* Custom Sync: Thumbs -> Main (click to change main image) */
  $thumbs.on('click', '.slick-slide', function () {
    var index = $(this).data('slick-index');
    $main.slick('slickGoTo', index);
  });


  /* Pause on thumb click, resume after 4s */
  $thumbs.on('click', '.thumb-item', function () {
    $main.slick('slickPause');
    setTimeout(function () { $main.slick('slickPlay'); }, 4000);
  });

  /* ── Image Zoom on Hover ── */
  $main.on('mousemove', '.slick-slide', function (e) {
    var $img = $(this).find('img');
    if (!$img.length) return;

    var offset = $(this).offset();
    var width = $(this).outerWidth();
    var height = $(this).outerHeight();

    // Calculate mouse position relative to the container as a percentage
    var x = ((e.pageX - offset.left) / width) * 100;
    var y = ((e.pageY - offset.top) / height) * 100;

    $img.css('transform-origin', x + '% ' + y + '%');
  });

});