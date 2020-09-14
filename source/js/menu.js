var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.toggle-menu-button');

navMain.classList.remove('main-nav--nojs');
navToggle.classList.remove('toggle-menu-button--nojs');

navToggle.addEventListener('click', function () {

  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    navToggle.classList.remove('toggle-menu-button--open');
    navToggle.classList.add('toggle-menu-button--close');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    navToggle.classList.remove('toggle-menu-button--close');
    navToggle.classList.add('toggle-menu-button--open');
  }
});
