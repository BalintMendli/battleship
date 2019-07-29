export default function Player() {
  const positions = [];

  const attack = (board, x, y) => {
    if (!includesArray(positions, [x, y])) {
      const res = board.receiveAttack(x, y);
      positions.push([x, y]);
      return res;
    }
  };

  const generateAttackPosition = board => {
    let attackPosition;
    const generateCoord = () => Math.floor(Math.random() * board.size);
    do {
      attackPosition = [generateCoord(), generateCoord()];
    } while (includesArray(positions, attackPosition));
    attack(board, ...attackPosition);
  };

  const isEqual = (arr1, arr2) =>
    arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);

  const includesArray = (arr1, arr2) =>
    arr1.some(arr1Elem => isEqual(arr1Elem, arr2));

  return { attack, generateAttackPosition };
}
