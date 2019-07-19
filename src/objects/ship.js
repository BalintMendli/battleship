export default function Ship(length) {
  const ship = new Array(length).fill(false);
  const hit = n => (ship[n] = true);
  const isSunk = () => ship.every(x => x);
  return {
    length,
    hit,
    isSunk
  };
}
