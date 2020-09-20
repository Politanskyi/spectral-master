let html = document.documentElement;
let body = document.body;
let bgMask = document.createElement('div');
let parentMenu = document.querySelector('.menu');
let openMenu = document.querySelector('.open-menu');
let closeMenu = document.querySelector('.close-menu');

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
    let parentLink = target.closest('li').querySelector('a');
    let subMenu = target.closest('li').querySelector('.sub-menu');
    let subBtn = target.closest('li').querySelector('.arrow');

    if (parentLink && !subMenu.classList.contains('show')) {
        subMenu.classList.add('show');
        subBtn.classList.add('show');
        e.preventDefault();
        return false;
    }

        // subMenu.classList.toggle('show');
        // subBtn.classList.toggle('show');

    console.log(1);
})

parentMenu.addEventListener('dblclick', function (e) {
    let target = e.target;
    let subMenu = target.closest('li').querySelector('.sub-menu');
    let subBtn = target.closest('li').querySelector('.arrow');

    if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        subBtn.classList.remove('show');
    }
    console.log(2);
})

// $('.menu').dblclick(function (e) {
//     let target = e.target;
//     let subMenu = target.closest('li').querySelector('.sub-menu');
//
//     if (subMenu.classList.contains('show')) {
//         subMenu.classList.remove('show');
//     }
//     console.log(2);
// }).click(function (e) {
//     let target = e.target;
//     let subMenu = target.closest('li').querySelector('.sub-menu');
//
//     if (!subMenu.classList.contains('show')) {
//         subMenu.classList.add('show');
//         e.preventDefault();
//         return false;
//     }
//     console.log(1);
// })