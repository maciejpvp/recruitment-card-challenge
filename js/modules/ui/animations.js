export function initTextSpans(elements) {
  elements.forEach((el) => {
    if (el)
      el.innerHTML = el.textContent
        .split('')
        .map((c) => `<span>${c}</span>`)
        .join('');
  });
}

export function updateTextWithAnimation(element, newText) {
  const spans = element.querySelectorAll('span');
  const newChars = newText.split('');

  newChars.forEach((char, i) => {
  if (i >= spans.length) {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'char-animate';
      element.appendChild(span);
    } else if (spans[i].textContent !== char) {
      spans[i].textContent = char;
      spans[i].className = '';
      void spans[i].offsetWidth; // force reflow
      spans[i].className = 'char-animate';
    }
  });

  for (let i = newChars.length; i < spans.length; i++) {
    spans[i].remove();
  }
}
