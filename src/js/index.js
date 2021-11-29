'use strict';
import '../sass/style.scss';
import Typed from './components/typed.min.js';
import {Swiper} from './components/swiper.js';

document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');

  let header = document.querySelector('.header');
  let burgerBtn = document.querySelector('.burger');
  let navLinks = document.querySelectorAll('.nav__link');


  // -----------  mobile or not  -----------

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};



  const scrollItems = document.querySelectorAll('.scroll-item');

  if (scrollItems.length > 0) {
    setTimeout(() => {
      showScrollAnim();
    }, 500);

    window.addEventListener('scroll', showScrollAnim);

    function showScrollAnim() {
      for (let scrollItem of scrollItems) {
        // element height
        const scrollItemHeight = scrollItem.offsetHeight;

        // position on a page
        const scrollItemOffset = scrollY  + scrollItem.getBoundingClientRect().top;
        
        // part of item needed to scroll to be shown
        const scrollItemPart = 4;

        // position to be scrolled for item to appier
        let viewPoint = window.innerHeight - scrollItemHeight / scrollItemPart;
        // case if item is larger than window
        if (scrollItemHeight > window.innerHeight) {
          viewPoint = window.innerHeight - window.innerHeight / scrollItemPart;
        }

        if (scrollY > scrollItemOffset - viewPoint) {
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
    strings: ['James Bo', 'Stas Prokopyshyn'],
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



  // -----------  active scroll menu item  -----------

  window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;
    const allSections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav__item');

    allSections.forEach(s => {
      console.log(s.offsetTop)
    })
    

    for (let i = 0; i < allSections.length; i++) {
      let sectionPosition = allSections[i].offsetTop;
      
      
      if (sectionPosition - header.clientHeight < scrollDistance) {
        for (let navLink of navLinks) {
          navLink.classList.remove('nav__link--active');
        }
        navItems[i].querySelector('.nav__link').classList.add('nav__link--active');
      }

      let contacts = document.querySelector('.contacts');
      let contactsPosition = contacts.offsetTop - 500;

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
    // scroll width
    let body = document.body;
    let paddingOffset = window.innerWidth - body.offsetWidth + 'px';

    // blocking scroll
    if (elem.classList.contains(classActive)) {
      document.body.style.overflow = 'hidden';

      // case of desktop - removing 'jump of page'
      if (!isMobile.any()) {
        body.style.paddingRight = paddingOffset;
        header.style.paddingRight = paddingOffset;
      }
    } else {
      document.body.style.overflow = '';

      // adding paddings if desktop
      if (!isMobile.any()) {
        body.style.paddingRight = '0px';
        header.style.paddingRight = '0px';
      }
    }
  }

  //-----------  burger-menu  -----------

  burgerBtn.addEventListener('click', function () {
    header.classList.toggle('header--active-nav');
    burgerBtn.classList.toggle('burger--active');

    // blocking-resuming scroll
    scrollToggle(burgerBtn, 'burger--active');
  });

  // burger close
  let resetNav = function () {
    if (burgerBtn.classList.contains('burger--active')) {
      burgerBtn.classList.remove('burger--active');
      header.classList.remove('header--active-nav');

      scrollToggle(burgerBtn, 'burger--active');
    }
  };

  // closing burger
  for (let navLink of navLinks) {
    navLink.addEventListener('click', function (evt) {
      resetNav();
    });
  }

  // closing burger if resizing
  window.addEventListener('resize', resetNav);
});
