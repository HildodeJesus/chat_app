export function generateRandomNumbers(start: number, finish: number) {
  return Math.floor(Math.random() * finish) + start;
}
