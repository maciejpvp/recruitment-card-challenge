export function highlight(el, active, focusRing, frontFace) {
  if (!active) {
    focusRing.classList.remove('is-active');
    return;
  }

  const elRect = el.getBoundingClientRect();
  const parentRect = frontFace.getBoundingClientRect();

  const top = elRect.top - parentRect.top;
  const left = elRect.left - parentRect.left;

  const width = Math.max(elRect.width, el.scrollWidth);
  const height = Math.max(elRect.height, el.scrollHeight);

  focusRing.style.width = `${width}px`;
  focusRing.style.height = `${height}px`;
  focusRing.style.transform = `translate(${left}px, ${top}px)`;

  focusRing.classList.add('is-active');
}
