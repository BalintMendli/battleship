import Gameboard from '../src/objects/gameboard';

describe('Gameboard', () => {
  const board = Gameboard();

  it('has a size', () => {
    expect(board.size).toBe(10);
  });

  it('has a board array', () => {
    expect(Array.isArray(board.board)).toBe(true);
    expect(board.board.length).toBe(board.size ** 2);
  });

  it('can place ships', () => {
    board.placeShips([3, 2, 1]);
    expect(board.board.filter(c => c.ship).length).toBe(6);
  });

  it('has a receiveAttack function', () => {
    expect(typeof board.receiveAttack).toBe('function');
  });

  it('marks the position when receives an attack', () => {
    expect(board.board[0]).toBe(false);
    board.receiveAttack(0, 0);
    expect(board.board[0]).toBe(true);
  });

  it('reports when all ships have been sunk', () => {
    board.placeShips([3, 2, 1]);
    expect(board.isAllShipsSunk()).toBe(false);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board.receiveAttack(i, j);
      }
    }
    expect(board.isAllShipsSunk()).toBe(true);
  });
});
