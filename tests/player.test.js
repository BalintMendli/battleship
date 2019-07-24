import Player from '../src/objects/player';

describe('Player', () => {
  let player;
  let board;

  beforeEach(() => {
    player = Player();
    board = { receiveAttack: jest.fn() };
  });

  it('has an attack function', () => {
    expect(typeof player.attack).toBe('function');
  });

  it('has a generateAttackPosition function', () => {
    expect(typeof player.generateAttackPosition).toBe('function');
  });

  test('attack calls board.receiveAttack function', () => {
    player.attack(board, 0, 0);
    expect(board.receiveAttack).toBeCalledWith(0, 0);
  });

  test('generateAttackPosition calls board.receiveAttack function', () => {
    player.generateAttackPosition(board);
    expect(board.receiveAttack).toBeCalled();
  });

  it('can not attack the same position twice', () => {
    player.attack(board, 0, 0);
    player.attack(board, 0, 0);
    expect(board.receiveAttack.mock.calls.length).toBe(1);
  });
});
