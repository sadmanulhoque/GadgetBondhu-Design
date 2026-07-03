/* ============================================================
   ACTIONS — actions.js
   Quantity stepper logic
   ============================================================ */

(function () {

  var input = document.getElementById('qty-input');

  function changeQty(delta) {
    if (!input) return;
    var val = parseInt(input.value, 10) + delta;
    if (val < 1)  val = 1;
    if (val > 99) val = 99;
    input.value = val;
  }

  /* Attach to decrease / increase buttons */
  var decreaseBtn = document.querySelector('.qty-btn[data-action="decrease"]');
  var increaseBtn = document.querySelector('.qty-btn[data-action="increase"]');

  if (decreaseBtn) decreaseBtn.addEventListener('click', function () { changeQty(-1); });
  if (increaseBtn) increaseBtn.addEventListener('click', function () { changeQty(1); });

})();