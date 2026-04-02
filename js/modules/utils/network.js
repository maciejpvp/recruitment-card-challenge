export function detectNetwork(digits) {
  if (/^4/.test(digits)) return 'visa';
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard';
  return null;
}

export function updateNetworkLogo(digits, visaLogos, mastercardLogos) {
  const network = detectNetwork(digits);
  const showVisa = network !== 'mastercard';
  visaLogos.forEach((el) => (el.style.display = showVisa ? 'block' : 'none'));
  mastercardLogos.forEach((el) => (el.style.display = showVisa ? 'none' : 'block'));
}
