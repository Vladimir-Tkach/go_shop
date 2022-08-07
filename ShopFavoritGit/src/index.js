import './styles/index.scss';
import $ from 'jquery';
import './slick/slick.min.js';
import './slick/slick.css';
import './slick/slick-theme.css';

$('document').ready(function () {
  // ПРОВЕРКА ВЫДЕЛЕННОГО В "ИЗБРАННОЕ" ПРИ НАЖАТИИ НА СЕРДЕЧКО НА ТОВАРЕ
  $('.products__item-like').on('click', function () {
    // ПОЯВЛЕНИЕ И ИСЧЕЗАНИЕ ПОЛНОГО СЕРДЕЧКА
    const children = $(this).children();
    $(children[1]).toggleClass('hide');
    return false;
  });
});
