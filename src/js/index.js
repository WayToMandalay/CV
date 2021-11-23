'use strict';
import '../sass/style.scss';
import './components/vanilla-tilt.min.js';
import Typed from './components/typed.min.js';
import {Swiper} from './components/swiper.js';



document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');

  let header = document.querySelector('.header');
  let burgerBtn = document.querySelector('.burger');
  let navLinks = document.querySelectorAll('.nav__link');

  const scrollItems = document.querySelectorAll('.scroll-item');

  if (scrollItems.length > 0) {
    setTimeout(() => {
      showScrollAnim();
    }, 500);

    window.addEventListener('scroll', showScrollAnim);

    function showScrollAnim() {
      for (let scrollItem of scrollItems) {
        // высота элемента
        const scrollItemHeight = scrollItem.offsetHeight;
        // положение на странице (прокрутка страницы top окна + положение элемента относительно окна)
        const scrollItemOffset =
          pageYOffset + scrollItem.getBoundingClientRect().top;
        // при прокрутке на какую часть элемента показываем его на странице (прокрутив 4 часть элемента)
        const scrollItemPart = 4;

        // определяем точку появления элемента - после появления в окне четверти элемента
        let viewPoint = window.innerHeight - scrollItemHeight / scrollItemPart;
        // если элемент больше окна, при прокрутке четверти окна
        if (scrollItemHeight > window.innerHeight) {
          viewPoint = window.innerHeight - window.innerHeight / scrollItemPart;
        }

        if (pageYOffset > scrollItemOffset - viewPoint) {
          scrollItem.classList.add('scroll-item--active');
        }
      }
    }
  }

  window.onscroll = function () {
    if (window.pageYOffset > 100) {
      header.classList.add('header--active');
    } else {
      header.classList.remove('header--active');
    }
  };

  // typing 

  var typed = new Typed('.typed', {
    strings: ['Bond', 'Stas Prokopyshyn'],
    typeSpeed: 120,
    startDelay: 1800,
    backSpeed: 150,
  
    onComplete: (self) => {
      self.cursor.remove();
    },
  });

  // carousel

  const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 2200,
    slidesPerView: 2,
    grabCursor: true,
    keyboard: true,

    breakpoints: {
      // when window width is >= 400px
      400: {
        slidesPerView: 3,
      },
  
      576: {
        slidesPerView: 4,
      },
  
      768: {
        slidesPerView: 5,
      },
  
      992: {
        slidesPerView: 6,
        speed: 5000,
      },
  
      1400: {
        slidesPerView: 7,
      },
  
      1700: {
        slidesPerView: 8,
        speed: 1800,
      },
    },

    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },

  });

  document.querySelector(".carousel__container").addEventListener("mouseout", () => {
    console.log('out')
    swiper.autoplay.start();
  });


  // -----------  active scroll menu item  -----------
/*
  window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;
    let sections = document.querySelectorAll('.section');

    for (let i = 0; i < sections.length; i++) {
      let sectionPosition = sections[i].offsetTop;
      let navItems = document.querySelectorAll('.nav__item');

      if (sectionPosition - header.clientHeight < scrollDistance) {
        for (let navLink of navLinks) {
          navLink.classList.remove('nav__link--active');
        }

        navItems[i].querySelector('a').classList.add('nav__link--active');
      }

      let contacts = document.querySelector('.contacts');
      let contactsPosition = contacts.offsetTop - 200;

      if (contactsPosition - header.clientHeight < scrollDistance) {
        for (let navLink of navLinks) {
          navLink.classList.remove('nav__link--active');
        }

        navItems[i].querySelector('a').classList.add('nav__link--active');
      }
    }
  });

  //-----------  scroll toggle  -----------

  function scrollToggle(elem, classActive) {
    // ширина скролла
    let body = document.body;
    let paddingOffset = window.innerWidth - body.offsetWidth + 'px';

    // функция блокировки скролла
    if (elem.classList.contains(classActive)) {
      document.body.style.overflow = 'hidden';

      // если десктоп - убираем скачок страницы - компенсируем скролл
      if (!isMobile.any()) {
        body.style.paddingRight = paddingOffset;
        header.style.paddingRight = paddingOffset;
      }
    } else {
      document.body.style.overflow = '';

      // если десктоп - убираем компенсацию скролла
      if (!isMobile.any()) {
        body.style.paddingRight = '0px';
        header.style.paddingRight = '0px';
      }
    }
  }
*/
  //-----------  burger-menu  -----------

  burgerBtn.addEventListener('click', function () {
    header.classList.toggle('header--active-nav');
    burgerBtn.classList.toggle('burger--active');

    // блокируем/возобновляем скролл страницы
    scrollToggle(burgerBtn, 'burger--active');
  });

  // функция закрытия меню бургер
  let resetNav = function () {
    if (burgerBtn.classList.contains('burger--active')) {
      burgerBtn.classList.remove('burger--active');
      header.classList.remove('header--active-nav');

      scrollToggle(burgerBtn, 'burger--active');
    }
  };

  // закрываем бургер при клике на ссылку в меню
  for (let navLink of navLinks) {
    navLink.addEventListener('click', function (evt) {
      // если открыто меню-бургер, закрываем его
      resetNav();
    });
  }

  // закрываем бургер меню при ресайзе окна
  window.addEventListener('resize', resetNav);

  


});
