function invalidValue(v) {
  return v === null || v === undefined;
}

export function floatFixed(v, num) {
  if (invalidValue(v)) return '';
  return Number(v).toFixed(num);
}

export function currencies(v) {
  if (invalidValue(v)) return '';
  v = Number(v);
  v = Math.round(v / 100);
  const reg = /\B(?=(\d{3})+(?!\d))/g;
  v = (v).toString().replace(reg, ',');
  return v;
}
