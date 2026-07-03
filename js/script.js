document.addEventListener('DOMContentLoaded', function () {

  const mobileToggle = document.querySelector('.mobile-toggle');
  const catNav       = document.querySelector('.cat-nav');
  const navOverlay   = document.querySelector('.nav-overlay');
  const catNavClose  = document.querySelector('.cat-nav-close');

  function openDrawer() {
    catNav.classList.add('open');
    navOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-times';
  }

  function closeDrawer() {
    catNav.classList.remove('open');
    navOverlay.classList.remove('show');
    document.body.style.overflow = '';
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-bars';
  }

  // Hamburger toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      catNav.classList.contains('open') ? closeDrawer() : openDrawer();
    });
  }

  // Close button
  if (catNavClose) {
    catNavClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeDrawer();
    });
  }

  // Click on overlay to close
  if (navOverlay) {
    navOverlay.addEventListener('click', closeDrawer);
  }

  // Prevent clicks inside drawer from closing it
  if (catNav) {
    catNav.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  /* ==================== MOBILE ACCORDION (Multi-level) ==================== */
  const navLinks = document.querySelectorAll('.cat-nav-item > a');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      if (window.innerWidth >= 1024) return; // Desktop uses hover

      const parentItem = this.parentElement;
      const dropdown = parentItem.querySelector('.cat-nav-dropdown');

      // If no dropdown, just navigate
      if (!dropdown) {
        closeDrawer(); // close menu if it's a direct link
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const isOpen = parentItem.classList.contains('open');

      // Close all other top-level items
      document.querySelectorAll('.cat-nav-item.open').forEach(item => {
        if (item !== parentItem) item.classList.remove('open');
      });

      parentItem.classList.toggle('open', !isOpen);
    });
  });

  // Handle Level-1 clicks (Subcategories like MacBook)
  document.querySelectorAll('.level-1-item > a').forEach(link => {
    link.addEventListener('click', function (e) {
      if (window.innerWidth >= 1024) return;

      const parent = this.parentElement;
      const level2 = parent.querySelector('.level-2');

      if (!level2) return; // no children

      e.preventDefault();
      e.stopPropagation();

      const isOpen = parent.classList.contains('open');

      // Close other level-1 items
      parent.parentElement.querySelectorAll('.level-1-item.open').forEach(item => {
        if (item !== parent) item.classList.remove('open');
      });

      parent.classList.toggle('open', !isOpen);
    });
  });

  // Final links (child items) - close menu after click
  document.querySelectorAll('.level-2 a, .cat-nav-dropdown a:not(.level-1-item > a)').forEach(link => {
    link.addEventListener('click', function () {
      setTimeout(closeDrawer, 200);
    });
  });
});