let html = document.documentElement;
let body = document.body;
let bgMask = document.createElement('div');
let parentMenu = document.querySelector('.menu');
let openMenu = document.querySelector('.open-menu');
let closeMenu = document.querySelector('.close-menu');
let timer = null;

body.addEventListener('click', outsideMenu);
openMenu.addEventListener('click', openMenuFunc);
closeMenu.addEventListener('click', closeMenuFunc);

bgMask.classList.add('bg-mask');
body.prepend(bgMask);

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

let scrollBarWidth = getScrollbarWidth();

function openMenuFunc(e) {
    e.stopPropagation();
    html.style = `margin-right:${scrollBarWidth}px; --margin-fixed: ${scrollBarWidth}px`;
    html.classList.toggle('is-show');
    bgMask.classList.toggle('show');
    bgMask.classList.toggle('index');
}

function closeMenuFunc(e) {
    e.stopPropagation();
    html.removeAttribute('style');
    html.classList.toggle('is-show');
    bgMask.classList.toggle('show');

    setTimeout(function () {
        bgMask.classList.toggle('index');
    }, 500);
}

function outsideMenu(e) {
    if (!e.target.closest('.menu')) {
        html.removeAttribute('style');
        html.classList.remove('is-show');
        bgMask.classList.remove('show');

        setTimeout(function () {
            bgMask.classList.remove('index');
        }, 500);
    }
}

parentMenu.addEventListener('click', function (e) {
    let target = e.target;
    let subMenu = target.closest('li').querySelector('.sub-menu');
    let link = target.closest('li').querySelector('a');
    let arrow = target.closest('li').querySelector('.arrow');

    if (timer) {
        clearTimeout(timer);
    }

    if (!target.closest('.sub-menu')) {
        e.preventDefault();
    }

    if (subMenu && !subMenu.classList.contains('show') && !arrow) {
        arrow.classList.add('show');
        subMenu.classList.add('show');
    } else if (arrow) {
        arrow.classList.toggle('show');
        subMenu.classList.toggle('show');
    } else {
        timer = setTimeout(function () {
            subMenu.classList.remove('show');
            document.location.href = link.getAttribute('href');
        }, 250)
    }
})
;

parentMenu.addEventListener('dblclick', function (e) {
    let target = e.target;
    let subMenu = target.closest('li').querySelector('.sub-menu');
    let arrow = target.closest('li').querySelector('.arrow');

    e.preventDefault();
    clearTimeout(timer);
    arrow.classList.remove('show');
    subMenu.classList.remove('show');
});