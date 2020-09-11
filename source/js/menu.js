var navMain = document.querySelector('.main-nav');
var navMainTop = document.querySelector('.main-nav-top');
var navToggle = document.querySelector('.main-nav__toggle');

navToggle.classList.remove('main-nav__toggle--nojs');
navMain.classList.remove('main-nav--nojs');
navMainTop.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {

  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    navMainTop.classList.remove('main-nav--closed');
    navMainTop.classList.add('main-nav--opened');
    navToggle.classList.remove('main-nav__toggle--open');
    navToggle.classList.add('main-nav__toggle--close');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    navMainTop.classList.add('main-nav--closed');
    navMainTop.classList.remove('main-nav--opened');
    navToggle.classList.remove('main-nav__toggle--close');
    navToggle.classList.add('main-nav__toggle--open');
  }
});
