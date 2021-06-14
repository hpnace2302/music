// let $ = document.querySelector.bind(document);
// let $$ = document.querySelectorAll.bind(document);

document.querySelectorAll('.nav__item')[0].onclick = function() {home()}
function home() {
    document.querySelector('.content__nav--search').style.display = 'none';
    document.querySelectorAll('.nav__item--name')[0].classList.add('active')
    document.querySelectorAll('.nav__item--name')[1].classList.remove('active')
    document.querySelectorAll('.nav__item--name')[2].classList.remove('active')
    document.querySelectorAll('.nav__item--name')[3].classList.remove('active')
    document.querySelectorAll('.nav__item--name')[4].classList.remove('active')
}
document.querySelectorAll('.nav__item')[1].onclick = function() {search()}
function search() {
    document.querySelector('.content__nav--search').style.display = 'block';
    document.querySelectorAll('.nav__item--name')[1].classList.add('active')
    document.querySelectorAll('.nav__item--name')[0].classList.remove('active')
    document.querySelectorAll('.nav__item--name')[2].classList.remove('active')
    document.querySelectorAll('.nav__item--name')[3].classList.remove('active')
    document.querySelectorAll('.nav__item--name')[4].classList.remove('active')
}
document.querySelectorAll('.content__nav--search__icon')[1].onclick = function() {close()}
function close() {
    document.querySelector('.content__nav--search').style.display = 'none';
    document.querySelectorAll('.nav__item--name')[0].classList.add('active')
    document.querySelectorAll('.nav__item--name')[1].classList.remove('active')
}

document.querySelector('.content__nav--mobile__search').onclick = function() {searchMobile()}
function searchMobile() {
    document.querySelector('.navbar__mobile--search').style.display = 'block';
}
document.querySelector('.navbar__mobile--search__header--btn1').onclick = function() {closeMobileSearch()}
function closeMobileSearch() {
    document.querySelector('.navbar__mobile--search').style.display = 'none';
}
document.querySelector('.navbar__mobile--search__header--btn2').onclick = function() {closeMobileSearch2()}
function closeMobileSearch2() {
    document.querySelector('.navbar__mobile--search').style.display = 'none';
}
document.querySelector('.content__nav--mobile__bar').onclick = function() {mobileNavbar()}
function mobileNavbar() {
    document.querySelector('.navbar').style.display = 'block';
}
document.querySelector('.navbar__close--btn').onclick = function() {closeMobileNavbar()}
function closeMobileNavbar() {
    document.querySelector('.navbar').style.display = 'none';
}
// document.querySelector('.song').onclick = function() {song()}
// function song() {
//     document.querySelector('.player').style.display = 'block';
// }