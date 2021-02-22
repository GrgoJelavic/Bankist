'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


//Modal Open Account
const openModal = function(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

//Page navigation
document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

//Cookie Message
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
    'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);
document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function() {
        message.parentElement.removeChild(message); // message.remove();
    });


//Smooth Scrooling Learnmore
btnScrollTo.addEventListener('click', function(e) {
    const s1coordinates = section1.getBoundingClientRect();
    // window.scrollTo(
    //     s1coordinates.left + window.pageXOffset,
    //     s1coordinates.top + window.pageYOffset,
    //     behavior: 'smooth'
    // );
    section1.scrollIntoView({ behavior: 'smooth' });
});


//Menu Fade Animation
const handleNavHoveer = function(e) {
        if (e.target.classList.contains('nav__link')) {
            const link = e.target;
            const siblings = link.closest('.nav').querySelectorAll('.nav__link');
            const logo = link.closest('.nav').querySelector('img');

            siblings.forEach(el => {
                if (el !== link) el.style.opacity = this;
            });
            logo.style.opacity = this;
        }
    } //passing arguments into Handle with bind method
nav.addEventListener('mouseover', handleNavHoveer.bind(0.5));
nav.addEventListener('mouseout', handleNavHoveer.bind(1));

//h1 highlight
const h1 = document.querySelector('h1');

h1.addEventListener('mouseover', function(e) {
    h1.firstElementChild.style.color = 'white';
    h1.lastElementChild.style.color = 'orangered';
});
h1.addEventListener('mouseleave', function(e) {
    h1.firstElementChild.style.color = h1.lastElementChild.style.color = '#444444';
});

//Tabs Operations and Tabs Content areas
tabsContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.operations__tab');

    if (!clicked) return;

    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    tabsContent.forEach(content => content.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');

    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

//Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function() {
//     if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//     else nav.classList.remove('sticky');
// })
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);

//Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target)
};

const sectionObserver = new IntersectionObserver(
    revealSection, {
        root: null,
        threshold: 0.15
    });

allSections.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});


//Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    //replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));