export function formatCardNumber(value) {
  return value.replace(/\D/g, '').slice(0, 16);
}

export function formatGroups(digits) {
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(' ') : '';
}

export function buildPreviewNumber(digits) {
  const padded = digits.padEnd(16, '#');
  return padded.match(/.{4}/g).join(' ');
}
