'use strict';

///////////////////// DOM SELECTIONS ////////////////////////////////////

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// SECTIONS
const section1 = document.getElementById('section--1');
const opContents = document.querySelectorAll('.operations__content');
//BUTTONS
const btnScrollTo = document.querySelector('.btn--scroll-to');
const btnsContainer = document.querySelector('.operations__tab-container');
const btnsEl = document.querySelectorAll('.operations__tab');
//NAVIGATION BAR
const navMenu = document.querySelector('.nav__links');

// HEADER
const header = document.querySelector('.header');
const headerTitle = document.querySelector('.header__title');

//////////////////////////////// FUNCTIONS //////////////////////////////
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//////////////////////////////// CODE ///////////////////////////////////
////////////// MODAL WINDOW
// attach an event listener for all buttons designed for opening of the modal window
for (let i = 0; i < btnsOpenModal.length; i++) {
  // console.log(btnsOpenModal[i]);
  btnsOpenModal[i].addEventListener('click', openModal);
}

//scrolling smooth to first section
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// enrich menu bar's links with scrolling functionality to different webpage sections
navMenu.addEventListener('click', function (e) {
  e.preventDefault();
  const element = e.target;
  if (!element.classList.contains('nav__link')) return;
  const sectionID = element.getAttribute('href');
  console.log(sectionID);
  if (sectionID !== '#')
    document.querySelector(sectionID).scrollIntoView({ behavior: 'smooth' });
});

// closing functinality for the modal window
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

///////////////// OPERATION SECTION'S TABS
btnsContainer.addEventListener('click', function (e) {
  btnsEl.forEach(btn => {
    btn.classList.remove('operations__tab--active');
  });
  opContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  const target = e.target;
  const parentEl = target.closest('.operations__tab');
  if (!parentEl) return;
  const buttonNumber = parentEl.dataset.tab;
  parentEl.classList.add('operations__tab--active');
  opContents.forEach(content => {
    if (content.classList.contains(`operations__content--${buttonNumber}`))
      content.classList.add('operations__content--active');
  });
});

///////////////////// SLIDER
const sliderFunctionality = function () {
  // SLIDER'S ELEMENT SELECTIONS
  // const firstSlide = document.querySelector('.slide--1');
  // const secondSlide = document.querySelector('.slide--2');
  // const thirdSlide = document.querySelector('.slide--3');
  const slides = document.querySelectorAll('.slide');
  const btnLeftSlide = document.querySelector('.slider__btn--left');
  const btnRightSlide = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');

  let currentSlide = 0;

  // Slider's dots (dots are button html elements)
  const createDots = function () {
    slides.forEach((_, index) => {
      const html = `<button class="dots__dot" data-slide = "${index}"></button>`;
      dotsContainer.insertAdjacentHTML('beforeend', html);
    });
  };

  const activateDot = function (slide) {
    // first remove the class "dots_dot--active" from all dots
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    // select the dot which has the dataset attribute set to the current slide
    const activeDot = document.querySelector(
      `.dots__dot[data-slide = "${slide}"]`
    );
    // add the "dots__dot--active" class to the selected dot
    activeDot.classList.add('dots__dot--active');
  };

  // moves all slides horizontally as per current slide
  const moveToSlide = function (currSlide) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currSlide) * 100}%)`;
    });
  };

  // next slide button functionallity
  const nextSlide = function () {
    if (currentSlide !== slides.length - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    moveToSlide(currentSlide);
    activateDot(currentSlide);
  };

  btnRightSlide.addEventListener('click', function () {
    nextSlide();
  });

  // previous slide button functionallity
  const previousSlide = function () {
    if (currentSlide !== 0) {
      currentSlide--;
    } else {
      currentSlide = slides.length - 1;
    }
    moveToSlide(currentSlide);
    activateDot(currentSlide);
  };

  btnLeftSlide.addEventListener('click', function () {
    previousSlide();
  });

  // initialization function which displays initial slide (initially is the first slide element in the html document), creates all the dots and activate the dot corresponding to the initial slide.
  const init = function () {
    moveToSlide(currentSlide);
    createDots();
    activateDot(currentSlide);
  };
  init();

  // add an event listener for each of the dots
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.addEventListener('click', function () {
      // get the dataset attribute of the current looping dot
      const dotID = +dot.dataset.slide;
      console.log(dotID);
      // set the current slide same as the dataset attribute of the current looping dot
      currentSlide = dotID;
      moveToSlide(currentSlide);
      activateDot(currentSlide);
    });
  });
};
sliderFunctionality();

/////////////// HOVER OVER MENU BAR ITEMS
const navBar = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');

const handlerHover = function (e) {
  const targetEl = e.target.closest('.nav__link');
  if (!targetEl) return;
  const navLogo = e.target.closest('.nav').querySelector('.nav__logo');
  navLinks.forEach(el => {
    if (el !== targetEl) el.style.opacity = this;
  });
  navLogo.style.opacity = this;
};

navBar.addEventListener('mouseover', handlerHover.bind(0.5));
navBar.addEventListener('mouseout', handlerHover.bind(1));

////////////////// COOKIE MESSAGE
const cookieContainer = document.createElement('div');
cookieContainer.classList.add('cookie-message');
cookieContainer.innerHTML = `We use cookies for improving functionality and analytics
<button class="btn btn__close-cookie">Get it!</button>`;
// console.log(cookieContainer);
header.append(cookieContainer);

const btnCookie = document.querySelector('.btn__close-cookie');
btnCookie.addEventListener('click', function () {
  // cookieContainer.remove();
  cookieContainer.parentElement.removeChild(cookieContainer);
});

/////////////////// STICKY NAVIGATION
////// Method 1 (old method)
// const initPosition = section1.getBoundingClientRect();
// console.log(initPosition.top);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (initPosition.top < this.scrollY) navBar.classList.add('sticky');
//   else {
//     navBar.classList.remove('sticky');
//   }
// });

////// Method 2 (modern method)
const navBarHeight = navBar.getBoundingClientRect().height;

const stickyNavigationBar = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navBar.classList.add('sticky');
  else {
    navBar.classList.remove('sticky');
  }
};

const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navBarHeight}px`,
};

const navBarObserver = new IntersectionObserver(stickyNavigationBar, options);
navBarObserver.observe(header);

//////// SCROLLING ANIMATION
const sectionUnhide = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) entry.target.classList.remove('section--hidden');
};

const sectionObserver = new IntersectionObserver(sectionUnhide, {
  root: null,
  threshold: 0.15,
  // rootMargin: '-200px',
});

const sections = document.querySelectorAll('.section');
sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//////// LAZY-IMAGE LOADING
const lazyLoading = function (entries) {
  const [entry] = entries;
  const target = entry.target;
  if (!entry.isIntersecting) return;
  target.src = target.dataset.src;
  target.addEventListener('load', function () {
    target.classList.remove('lazy-img');
  });
  imagesObserver.unobserve(target);
};

const imagesObserver = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

const images = document.querySelectorAll('img[data-src]');
images.forEach(image => {
  imagesObserver.observe(image);
});
