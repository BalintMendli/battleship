import Player from './objects/player';
import Gameboard from './objects/gameboard';
import Game from './game';
import { init } from './displayController';

const player = Player(false);
const computer = Player(true);

const playerBoard = Gameboard();
const computerBoard = Gameboard();

export const game = Game(player, computer, playerBoard, computerBoard);

init();

game.start();
