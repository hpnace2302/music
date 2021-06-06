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