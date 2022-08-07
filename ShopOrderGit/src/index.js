import './styles/index.scss';
import $ from 'jquery';
import './slick/slick.min.js';
import './slick/slick.css';
import './slick/slick-theme.css';

const sdek_radio_value = 'sdek';

$('document').ready(function () {
  let delivery_type = undefined;

  $('.delivery').on('change', function () {
    const sdek_map = $('.sdek_map');
    const address_data_form = $('.address_data_form');

    delivery_type = this.value;

    if (this.value == sdek_radio_value) {
      sdek_map.removeClass('hide');
      address_data_form.addClass('hide');
    } else {
      sdek_map.addClass('hide');
      address_data_form.removeClass('hide');
    }
  });

  $('.order__payment-btn').on('click', function () {
    $('.required').each(function () {
      const element = this;
      if (!Boolean(this.value)) {
        element.classList = `${element.classList} error-input`;
      } else {
        const classList = Array(...this.classList);
        this.classList = classList
          .filter((item) => item !== 'error-input')
          .join(' ');
      }
    });

    $('.required_address').each(function () {
      if (delivery_type === 'sdek_radio_value') {
        return;
      }

      const element = this;
      if (!Boolean(this.value)) {
        element.classList = `${element.classList} error-input`;
      } else {
        const classList = Array(...this.classList);
        this.classList = classList
          .filter((item) => item !== 'error-input')
          .join(' ');
      }
    });
  });
});
