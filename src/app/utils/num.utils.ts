export function createRandom(min: number, max: number) {
  const diff = max - min;
  const random = Math.random();
  return Math.floor((random * diff) + min);
}
