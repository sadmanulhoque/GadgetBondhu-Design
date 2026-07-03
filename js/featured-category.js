// Featured Categories Toggle
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggle-categories');
  const grid = document.getElementById('categories-grid');
  
  if (!toggleBtn || !grid) return;

  const extraItems = grid.querySelectorAll('.extra');
  let isExpanded = false;

  toggleBtn.addEventListener('click', function() {
    isExpanded = !isExpanded;

    if (isExpanded) {
      // Show all extra items
      extraItems.forEach(item => {
        item.style.display = 'flex';
      });
      
      toggleBtn.innerHTML = `
        Show Less Categories 
        <i class="fas fa-chevron-up"></i>
      `;
      toggleBtn.classList.add('expanded');
    } else {
      // Hide extra items
      extraItems.forEach(item => {
        item.style.display = 'none';
      });
      
      toggleBtn.innerHTML = `
        See All Categories
        <i class="fas fa-chevron-down"></i>
      `;
      toggleBtn.classList.remove('expanded');
    }
  });
});