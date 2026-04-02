import { formatCardNumber, formatGroups, buildPreviewNumber } from '../utils/formatters.js';
import { updateNetworkLogo } from '../utils/network.js';
import { updateTextWithAnimation } from '../ui/animations.js';
import { highlight } from '../ui/focus.js';

export function setupEventListeners(refs) {
  const {
    inputNumber,
    inputName,
    inputMonth,
    inputYear,
    inputCvv,
    previewNumber,
    previewName,
    previewMonth,
    previewYear,
    previewCvv,
    previewHolder,
    previewExpires,
    cardPreview,
    focusRing,
    frontFace,
    visaLogos,
    mastercardLogos,
  } = refs;

  // Card Number
  inputNumber.addEventListener('focus', () => highlight(previewNumber, true, focusRing, frontFace));
  inputNumber.addEventListener('blur', () => highlight(previewNumber, false, focusRing, frontFace));
  inputNumber.addEventListener('input', ({ target }) => {
    const digits = formatCardNumber(target.value);
    target.value = formatGroups(digits);
    updateTextWithAnimation(previewNumber, buildPreviewNumber(digits));
    updateNetworkLogo(digits, visaLogos, mastercardLogos);
  });

  // Card Name
  inputName.addEventListener('focus', () => highlight(previewHolder, true, focusRing, frontFace));
  inputName.addEventListener('blur', () => highlight(previewHolder, false, focusRing, frontFace));
  inputName.addEventListener('input', ({ target }) => {
    const name = target.value.trimLeft();
    updateTextWithAnimation(previewName, name.toUpperCase() || 'FULL NAME');
    if (document.activeElement === inputName) {
      highlight(previewHolder, true, focusRing, frontFace);
    }
  });

  // Expiry Month & Year
  [inputMonth, inputYear].forEach((el) => {
    el.addEventListener('focus', () => highlight(previewExpires, true, focusRing, frontFace));
    el.addEventListener('blur', () => highlight(previewExpires, false, focusRing, frontFace));
  });
  inputMonth.addEventListener('change', ({ target }) =>
    updateTextWithAnimation(previewMonth, target.value || 'MM')
  );
  inputYear.addEventListener('change', ({ target }) =>
    updateTextWithAnimation(previewYear, target.value || 'YY')
  );

  // CVV
  inputCvv.addEventListener('input', ({ target }) => {
    const val = target.value.replace(/\D/g, '').slice(0, 4);
    target.value = val;
    updateTextWithAnimation(previewCvv, val);
  });
  inputCvv.addEventListener('focus', () => cardPreview.classList.add('is-flipped'));
  inputCvv.addEventListener('blur', () => cardPreview.classList.remove('is-flipped'));

  // form validation
  const form = document.querySelector('.card__form');
  const submitBtn = form.querySelector('.card__form__submit');

  const validateForm = () => {
    const numberValid = inputNumber.value.replace(/\s/g, '').length >= 15;
    const nameValid = inputName.value.trim().length > 0;
    const monthValid = inputMonth.value !== '';
    const yearValid = inputYear.value !== '';
    const cvvValid = inputCvv.value.length >= 3;

    submitBtn.disabled = !(numberValid && nameValid && monthValid && yearValid && cvvValid);
  };

  form.addEventListener('input', validateForm);
  form.addEventListener('change', validateForm);
  validateForm();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const output = {
      cardNumber: inputNumber.value.replace(/\s/g, ''),
      cardName: inputName.value.trim(),
      expireMonth: inputMonth.value,
      expireYear: inputYear.value,
      cvv: inputCvv.value,
    };
    console.log(output);

    submitBtn.textContent = '✓ Done!';
    submitBtn.style.background = '#22c55e';
    setTimeout(() => {
      submitBtn.textContent = 'Submit';
      submitBtn.style.background = '';
    }, 2000);
  });
}
