/**
 * function that returns a random number between min and max
 * @param min {number}
 * @param max {number}
 * @returns {number}
 */
export function randomMinMax(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}