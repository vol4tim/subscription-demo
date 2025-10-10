export function fromWei(amount, decimals, fixed = 4) {
  const wei = BigInt(amount);
  const value = Number(wei) / Math.pow(10, decimals);
  return value.toFixed(fixed);
}
export function toWei(value, decimals) {
  const weiValue = BigInt(Math.floor(Number(value) * Math.pow(10, decimals)));
  return weiValue.toString();
}
