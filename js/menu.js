let html = document.documentElement;
let body = document.body;
let bgMask = document.createElement('div');
let openMenu = document.querySelector('.open-menu');
let closeMenu = document.querySelector('.close-menu');

body.addEventListener('click', outsideMenu);
openMenu.addEventListener('click', openMenuFunc);
closeMenu.addEventListener('click', closeMenuFunc);

bgMask.classList.add('bg-mask');
body.prepend(bgMask);

function getScrollbarWidth () {
    return window.innerWidth - document.documentElement.clientWidth;
}

let scrollBarWidth = getScrollbarWidth();

function openMenuFunc (e) {
    e.stopPropagation();
    html.style = `margin-right:${scrollBarWidth}px; --margin-fixed: ${scrollBarWidth}px`;
    html.classList.toggle('is-show');
    bgMask.classList.toggle('show');
    bgMask.classList.toggle('index');
}

function closeMenuFunc (e) {
    e.stopPropagation();
    html.removeAttribute('style');
    html.classList.toggle('is-show');
    bgMask.classList.toggle('show');

    setTimeout(function () {
        bgMask.classList.toggle('index');
    },500);
}

function outsideMenu (e) {
    if (!e.target.closest('.menu')) {
        html.removeAttribute('style');
        html.classList.remove('is-show');
        bgMask.classList.remove('show');

        setTimeout(function () {
            bgMask.classList.remove('index');
        },500);
    }
}