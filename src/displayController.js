import { game } from './index';

const board1 = document.querySelector('.board-1');
const board2 = document.querySelector('.board-2');
const reset = document.querySelector('.reset');
const messages = document.querySelector('.messages');

let isOn = true;

const init = () => {
  reset.addEventListener('click', () => location.reload());
};

const renderBoard = (board, boardId) => {
  const domBoard = boardId === 0 ? board1 : board2;

  [...domBoard.children].forEach(el => el.remove());

  board.forEach((c, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.id = i;
    if (boardId === 1) cell.addEventListener('click', cellClick);
    if (boardId === 0 && c && c.ship) cell.classList.add('ship');
    if (c === true) cell.textContent = '·';
    if (c.hit) cell.classList.add('hit');
    if (c && c.ship && c.ship.isSunk()) cell.classList.add('sunk');
    domBoard.appendChild(cell);
  });

  function cellClick(e) {
    const id = e.target.dataset.id;
    const getXCoord = i => i % 10;
    const getYCoord = i => Math.floor(i / 10);
    if (!e.target.textContent && !e.target.classList.contains('hit') && isOn)
      game.playerTurn(getXCoord(id), getYCoord(id));
  }
};

const renderMessage = message => {
  messages.textContent = message;
};

const off = () => {
  isOn = false;
};

export { init, renderBoard, renderMessage, off };
