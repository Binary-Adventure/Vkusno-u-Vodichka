const toggleButton = document.querySelector('.navbar-toggler');
const navCollapse = document.querySelector('.navbar-collapse');

toggleButton.addEventListener('click', () => {
  navCollapse.classList.toggle('show');
});

$(document).ready(function(){
  $('.header').height($(window).height());
 })