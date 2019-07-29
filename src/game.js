import { renderBoard, renderMessage, off } from './displayController';

export default function Game(player, computer, playerBoard, computerBoard) {
  const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  const start = () => {
    playerBoard.placeShips(shipLengths);
    computerBoard.placeShips(shipLengths);
    renderBoard(playerBoard.board, 0);
    renderBoard(computerBoard.board, 1);
  };

  const playerTurn = (x, y) => {
    const res = player.attack(computerBoard, x, y);
    if (computerBoard.isAllShipsSunk()) end('Player');
    renderBoard(computerBoard.board, 1);
    if (!res) compTurn();
  };

  const compTurn = () => {
    computer.generateAttackPosition(playerBoard);
    if (playerBoard.isAllShipsSunk()) end('Computer');
    renderBoard(playerBoard.board, 0);
  };

  const end = winner => {
    renderMessage(`${winner} has won!`);
    off();
  };

  return { start, playerTurn };
}
