// js/filter-drawer.js

$(document).ready(function () {

  // Open drawer
  $('.filter-btn').on('click', function () {
    $('.filter-drawer').addClass('active');
    $('.filter-overlay').addClass('active');
    $('body').css('overflow', 'hidden');
  });

  // Close drawer via X button
  $('.filter-drawer-close').on('click', function () {
    closeDrawer();
  });

  // Close drawer via overlay click
  $('.filter-overlay').on('click', function () {
    closeDrawer();
  });

  function closeDrawer() {
    $('.filter-drawer').removeClass('active');
    $('.filter-overlay').removeClass('active');
    $('body').css('overflow', '');
  }

});