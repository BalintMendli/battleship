export default function Ship(length) {
  const positions = new Array(length).fill(false);

  const hit = n => (positions[n] = true);

  const isSunk = () => positions.every(x => x);

  return {
    length,
    positions,
    hit,
    isSunk
  };
}
