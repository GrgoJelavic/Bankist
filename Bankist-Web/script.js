'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

//Cookie Message
const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
    'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.before(message);
document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function() {
        message.parentElement.removeChild(message); // message.remove();
    });

//Menu Fade Animation
const nav = document.querySelector('.nav');
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
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.operations__tab');

    if (!clicked) return;

    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    tabsContent.forEach(content => content.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');

    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});