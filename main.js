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

// document.querySelector('.content__nav--accout-login').onmouseover = function() {myFunction1()};
// function myFunction1() {
// document.querySelector(".content__nav--accout-login").classList.add('enlarged')
// }
// document.querySelector('.content__nav--accout-login').onmouseout = function() {myFunction2()};
// function myFunction2() {
// document.querySelector(".content__nav--accout-login").classList.remove('enlarged')
// }
// document.querySelector('.content__nav--accout-register').onmouseover = function() {myFunction1()};
// function myFunction3() {
// document.querySelector(".content__nav--accout-register").classList.add('enlarged')
// }
// document.querySelector('.content__nav--accout-register').onmouseout = function() {myFunction2()};
// function myFunction4() {
// document.querySelector(".content__nav--accout-register").classList.remove('enlarged')
// }