/**
 * flash-sale.js
 * Slick carousel init + self-contained countdown timer for the
 * Flash Sale section.
 *
 * FIX APPLIED: This file previously only built the countdown timer
 * and never called .slick() on .flash-sale-slick. Without that,
 * jQuery/Slick never wrapped the .product-card elements in
 * .slick-slide / .slick-track, so none of the carousel CSS in
 * flash-sale.css (track flex, slide width, equal-height stretch,
 * arrow wiring, etc.) had anything to target — the cards just
 * rendered as unstyled full-width blocks stacked on top of each
 * other. The block below mirrors new-trends.js exactly, just
 * scoped to .flash-sale-slick / #flash-sale-prev / #flash-sale-next.
 *
 * No external library / CDN dependency for the countdown — this
 * builds the exact same markup simplyCountdown.js would
 * (.simply-countdown > .simply-section > .simply-amount /
 * .simply-word), so the existing CSS in css/flash-sale.css keeps
 * working untouched.
 */
(function () {
  'use strict';

  // ==================== SLICK CAROUSEL INIT ====================
  if (window.jQuery && jQuery.fn.slick) {
    jQuery(function ($) {
      var $slider = $('.flash-sale-slick');
      if (!$slider.length) return;

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

      $('#flash-sale-prev').on('click', function () {
        $slider.slick('slickPrev');
      });

      $('#flash-sale-next').on('click', function () {
        $slider.slick('slickNext');
      });
    });
  }

  // ==================== COUNTDOWN TIMER ====================
  document.addEventListener('DOMContentLoaded', function () {

    var el = document.getElementById('flash-sale-countdown');
    if (!el) return;

    // Flash sale end time.
    // Change this to a fixed date if you prefer, e.g.:
    // var endDate = new Date(2026, 6, 10, 23, 59, 59); // months are 0-indexed (6 = July)
    var endDate = new Date();
    endDate.setHours(endDate.getHours() + 18); // ends 18 hours from page load

    var units = ['days', 'hours', 'minutes', 'seconds'];
    var refs = {};

    // Build the markup once.
    el.innerHTML = '';
    units.forEach(function (key) {
      var section = document.createElement('div');
      section.className = 'simply-section';

      var inner = document.createElement('div');

      var amount = document.createElement('span');
      amount.className = 'simply-amount';
      amount.textContent = '00';

      var word = document.createElement('span');
      word.className = 'simply-word';

      inner.appendChild(amount);
      inner.appendChild(word);
      section.appendChild(inner);
      el.appendChild(section);

      refs[key] = { amount: amount, word: word };
    });

    function pad(n) {
      return (n < 10 ? '0' : '') + n;
    }

    function setWord(key, singular, plural, count) {
      refs[key].word.textContent = count === 1 ? singular : plural;
    }

    var timer;

    function tick() {
      var distance = endDate.getTime() - new Date().getTime();

      if (distance <= 0) {
        units.forEach(function (key) {
          refs[key].amount.textContent = '00';
        });
        clearInterval(timer);

        var badge = document.querySelector('.flash-sale-badge');
        if (badge) badge.innerHTML = '<i class="fas fa-bolt"></i> Sale Ended';
        return;
      }

      var d = Math.floor(distance / (1000 * 60 * 60 * 24));
      var h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var s = Math.floor((distance % (1000 * 60)) / 1000);

      refs.days.amount.textContent = pad(d);
      setWord('days', 'Day', 'Days', d);

      refs.hours.amount.textContent = pad(h);
      setWord('hours', 'Hr', 'Hrs', h);

      refs.minutes.amount.textContent = pad(m);
      setWord('minutes', 'Min', 'Min', m);

      refs.seconds.amount.textContent = pad(s);
      setWord('seconds', 'Sec', 'Sec', s);
    }

    tick();
    timer = setInterval(tick, 1000);
  });

}());