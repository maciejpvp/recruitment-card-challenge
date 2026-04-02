import { initTextSpans } from './ui/animations.js';
import { setupEventListeners } from './events/handlers.js';

export default function () {
  const refs = {
    inputNumber: document.getElementById('input-card-number'),
    inputName: document.getElementById('input-card-name'),
    inputMonth: document.getElementById('input-expiry-month'),
    inputYear: document.getElementById('input-expiry-year'),
    inputCvv: document.getElementById('input-cvv'),

    previewNumber: document.getElementById('card-preview-number'),
    previewName: document.getElementById('card-preview-name'),
    previewMonth: document.getElementById('card-preview-month'),
    previewYear: document.getElementById('card-preview-year'),
    previewCvv: document.getElementById('card-preview-cvv'),
    previewHolder: document.querySelector('.card__preview__holder'),
    previewExpires: document.querySelector('.card__preview__expires'),

    visaLogos: document.querySelectorAll(
      '.card__preview__logo-img--visa, .card__preview__back__logo-img--visa'
    ),
    mastercardLogos: document.querySelectorAll(
      '.card__preview__logo-img--mastercard, .card__preview__back__logo-img--mastercard'
    ),

    frontFace: document.querySelector('.card__preview__face--front'),
    focusRing: document.querySelector('.card__preview__focus-ring'),
    cardPreview: document.querySelector('.card__preview'),
  };

  initTextSpans([
    refs.previewNumber,
    refs.previewName,
    refs.previewMonth,
    refs.previewYear,
    refs.previewCvv,
  ]);

  setupEventListeners(refs);
}
