'use strict';

//Modal Open Account
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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


//Cookie Message
const header = document.querySelector('.header');
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
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
    const s1coordinates = section1.getBoundingClientRect();
    // window.scrollTo(
    //     s1coordinates.left + window.pageXOffset,
    //     s1coordinates.top + window.pageYOffset,
    //     behavior: 'smooth'
    // );
    section1.scrollIntoView({ behavior: 'smooth' });
});