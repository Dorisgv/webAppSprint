document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('signupModal');
  const openBtn = document.getElementById('create');
  const closeBtn = document.querySelector('.close-modal');

  openBtn.addEventListener('click', function(e) {
     e.preventDefault();
     modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
 });

  window.addEventListener('click', function(e) {
     if (e.target == modal) {
        modal.style.display = 'none';
     }
   });
});



