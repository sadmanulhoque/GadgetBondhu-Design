/* ============================================================
   VARIANT SELECTORS — variants.js
   ============================================================ */

(function () {

  /* Generic: clicking any variant button deselects siblings in the same .variant-options group */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.color-option, .storage-option, .type-option');
    if (!btn) return;

    var group = btn.closest('.variant-options');
    if (!group) return;

    group.querySelectorAll('button').forEach(function (b) {
      b.classList.remove('active');
    });

    btn.classList.add('active');
  });

})();