export function getCalculatedReturns(odds, stake) {
  return `£${(odds * stake).toFixed(2)}`;
}
