import './styles/index.scss';
import $ from 'jquery';
import './slick/slick.min.js';
import './slick/slick.css';
import './slick/slick-theme.css';
import './slider/index';
import './slider/slider_touch';
import './slider/slider-styles.css';

const sliderRangeSettings = {
  animate: 'slow',
  range: true,
  values: [0, 5000],
  min: 0,
  max: 10000,
};

$('document').ready(function () {
  // ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА БАНЕРА И ЕГО АВТОВОСПРОИЗВЕДЕНИЕ
  var itemCount = $('.shop__banner-item');
  itemCount = itemCount.length;
  $('.shop__banner-swiper').slick({
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3500,
  });

  $('#slider-range').slider(sliderRangeSettings);
  $('#slider-range_mobile').slider(sliderRangeSettings);

  const min = $('.slider-range_min');
  const max = $('.slider-range_max');

  const min_mobile = $('.slider-range_min_mobile');
  const max_mobile = $('.slider-range_max_mobile');

  min.text(sliderRangeSettings.values[0]);
  max.text(sliderRangeSettings.values[1]);

  min_mobile.text(sliderRangeSettings.values[0]);
  max_mobile.text(sliderRangeSettings.values[1]);

  $('#slider-range').slider({
    slide: (event, ui) => {
      min.text(ui.values[0]);
      max.text(ui.values[1]);
    },
  });

  $('#slider-range_mobile').slider({
    slide: (event, ui) => {
      min_mobile.text(ui.values[0]);
      max_mobile.text(ui.values[1]);
    },
  });

  // ДОБАВЛЕНИЕ И УДАЛЕНИЕ АКТИВНОГО КЛАССА ДЛЯ ТОЧЕК СЛАЙДЕРА
  $('.shop__banner-swiper').on('afterChange', function (currentSlide) {
    var banners = $('.shop__switcher-dot');
    var currentSlide = $('.shop__banner-swiper').slick('slickCurrentSlide');

    if (currentSlide == 0) {
      banners[currentSlide].classList.add('shop__switcher-dot--active');
      $('.shop__switcher-dot')
        .not(banners[currentSlide])
        .removeClass('shop__switcher-dot--active');
    } else if (currentSlide == itemCount - 1) {
      banners[2].classList.add('shop__switcher-dot--active');
      $('.shop__switcher-dot')
        .not(banners[2])
        .removeClass('shop__switcher-dot--active');
    } else {
      banners[1].classList.add('shop__switcher-dot--active');
      $('.shop__switcher-dot')
        .not(banners[1])
        .removeClass('shop__switcher-dot--active');
    }
  });

  // ИНИЦИАЛИЗАЦИЯ МАГАЗИННОГО СЛАЙДЕРА
  $('.shop__swiper').slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 769,
        settings: 'unslick',
      },
    ],
  });

  // ПРОВЕРКА ВЫДЕЛЕННОГО В "ИЗБРАННОЕ" ПРИ НАЖАТИИ НА СЕРДЕЧКО НА ТОВАРЕ
  $('.products__item-like').on('click', function () {
    // ПОЯВЛЕНИЕ И ИСЧЕЗАНИЕ ПОЛНОГО СЕРДЕЧКА
    var childrens = $(this).children();
    $(childrens[1]).toggleClass('hide');
    return false;
    /*         // ПОЯВЛЕНИЕ И ИСЧЕЗАНИЕ КНОПКИ "ИЗБРАННОЕ" ВВЕРХУ СТРАНИЦЫ
                var favorites = $('.like-active')
                var likeHideCount = 0
                for (var i = 0; i < favorites.length; i++) {
                    if (favorites[i].classList[1] == 'hide') {
                        likeHideCount++
                    }
                }

                if (favorites.length != likeHideCount) {
                    $('.favorites-image').removeClass('hide')
                }
                else {
                    $('.favorites-image').addClass('hide')
                } */
  });

  // ЕСЛИ ИНПУТ ПОИСКОВИКА ПУСТ, СКРЫТЬ КРЕСТИК ОЧИЩАЮЩИЙ ПОЛЕ
  if ($('.modal-search-input').val() == '') {
    $('.input-clear').addClass('hide');
  }

  // ПРИ КАЖДОМ ВВОДЕ С КЛАВИАТУРЫ В ИНПУТ ПРОВЕРЯТЬ ПУСТОТУ ПОЛЯ
  // ЕСЛИ ПОЛЯ ПУСТО, КРЕСТИК СДЕЛАТЬ НЕВИДИМЫМ
  $('.modal-search-input').keyup(function () {
    if ($(this).val() == '') {
      $(this).parent('.input-block').children('.input-clear').addClass('hide');
    } else {
      $(this)
        .parent('.input-block')
        .children('.input-clear')
        .removeClass('hide');
    }
  });

  // ПРИ НАЖАТИИ НА КРЕСТИК В ИНПУТЕ ОЧИЩАТЬ ПОЛЕ И СКРЫТЬ КРЕСТИК
  $('.modal-search-input-clear').on('click', function () {
    $('.modal-search-input').val('');
    $('.modal-search-input-clear').addClass('hide');
  });

  // ПРИ НАЖАТИИ НА ФИЛЬТР (ТЕКСТ) СДЕЛАТЬ ЕГО АКТИВНЫМ И ПЕРЕМЕСТИТЬ НА ПЕРВОЕ МЕСТО
  $('.catalog__filters-mobail-item').on('click', function () {
    var order = $('.catalog__filters-mobail-item');
    $(this).toggleClass('catalog__filters-mobail-item--active');
    $(this).children('.catalog__filters-mobail-item-close').toggleClass('hide');
    $(this).insertBefore($(order[0]));
  });

  // ПРИ НАЖАТИИ НА ЛУПУ ВЫВЕСТИ МОДАЛКУ С ФОРМОЙ ПОИСКА И ЗАПРЕТИТЬ body ПРОКРУТКУ
  $('.catalog__serch-mobail').on('click', function () {
    $('#search-modal').removeClass('hide');
    $('body').addClass('no-overflow');
  });
  // ПРИ НАЖАТИИ НА ЗНАЧЕК ФИЛЬТРА ВЫВЕСТИ МОДАЛКУ С ФОРМОЙ ПОИСКА И ЗАПРЕТИТЬ body ПРОКРУТКУ
  $('.catalog__filters-mobail').on('click', function () {
    $('#filters-modal').removeClass('hide');
    $('body').addClass('no-overflow');
  });
  //   // ДАЛЕЕ ИДУТ ВЫВОДЫ МОДАЛОК ПРИ НАЖАТИИ НА ФИЛЬТР (ТЕКСТ)
  //   $('#gender-filter').on('click', function () {
  //     if ($(this).hasClass('catalog__filters-mobail-item--active')) {
  //       $('#gender-modal').removeClass('hide');
  //       $('body').addClass('no-overflow');
  //     }
  //   });

  //   $('#price-filter').on('click', function () {
  //     if ($(this).hasClass('catalog__filters-mobail-item--active')) {
  //       $('#price-modal').removeClass('hide');
  //       $('body').addClass('no-overflow');
  //     }
  //   });

  //   $('#collection-filter').on('click', function () {
  //     if ($(this).hasClass('catalog__filters-mobail-item--active')) {
  //       $('#collection-modal').removeClass('hide');
  //       $('body').addClass('no-overflow');
  //     }
  //   });

  //   $('#category-filter').on('click', function () {
  //     if ($(this).hasClass('catalog__filters-mobail-item--active')) {
  //       $('#category-modal').removeClass('hide');
  //       $('body').addClass('no-overflow');
  //     }
  //   });

  // ПРИ НАЖАТИИ НА КРЕСТИК В ЛЮБОЙ МОДАЛКЕ СВОРАЧИВАЕМ ИХ ВСЕ И РАЗРЕШАЕМ ПРОКРУТКУ body
  $('.modal__close').on('click', function () {
    $('.catalog__modal').addClass('hide');
    $('body').removeClass('no-overflow');
  });
  // ПРИ НАЖАТИИ НА КНОПКУ "ЗАКРЫТЬ" В ЛЮБОЙ МОДАЛКЕ СВОРАЧИВАЕМ ИХ ВСЕ И РАЗРЕШАЕМ ПРОКРУТКУ body
  $('.close-btn').on('click', function () {
    $('.catalog__modal').addClass('hide');
    $('body').removeClass('no-overflow');
  });

  //   if (window.innerWidth <= 768) {
  //     $('.go-back-bnt').removeClass('hide');
  //   } else {
  //     $('.go-back-bnt').addClass('hide');
  //   }
});
