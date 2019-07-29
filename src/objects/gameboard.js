import Ship from './ship';

export default function Gameboard() {
  const size = 10;
  const board = new Array(size ** 2).fill(false);
  const ships = [];

  const placeShips = ships => {
    const generateOrientation = () => Math.random() >= 0.5;
    const generatePosition = n => Math.floor(Math.random() * n);
    ships.forEach(length => {
      const orientation = generateOrientation();
      let position;
      do {
        position = generatePosition(board.length);
      } while (!isPositionValid(position, length, orientation));
      placeShip(length, position, orientation);
    });
  };

  const placeShip = (length, n, isVertical) => {
    const ship = Ship(length);
    ships.push(ship);
    const inc = i => (isVertical ? i * size : i);

    ship.positions.forEach((p, i) => {
      board[n + inc(i)] = {
        ship,
        shipPos: i,
        hit: false
      };
    });
  };

  const isPositionValid = (n, length, isVertical) => {
    const inc = i => (isVertical ? i * size : i);
    const neighbourShip = n => getNeighbours(n).some(p => hasShip(p));
    const onEdgeVert = (first, next) =>
      !isVertical ? getYCoord(first) !== getYCoord(next) : false;
    const onEdgeHor = n => board[n] === undefined;
    for (let i = 0; i < length; i++) {
      if (
        hasShip(n + inc(i)) ||
        neighbourShip(n + inc(i)) ||
        onEdgeVert(n, n + inc(i)) ||
        onEdgeHor(n + inc(i))
      )
        return false;
    }
    return true;
  };

  const receiveAttack = (x, y) => {
    const index = getIndexFromCoords(x, y);
    if (hasShip(index)) {
      const ship = board[index].ship;
      const pos = board[index].shipPos;
      ship.hit(pos);
      board[index].hit = true;
      if (ship.isSunk())
        board.forEach((c, i) => {
          if (c.ship === ship) {
            getNeighbours(i).forEach(nb => {
              if (board[nb] === false) board[nb] = true;
            });
          }
        });
      return true;
    } else {
      board[index] = true;
      return false;
    }
  };

  const isAllShipsSunk = () => ships.every(ship => ship.isSunk());

  const getIndexFromCoords = (x, y) => y * size + x;

  const getXCoord = i => i % size;

  const getYCoord = i => Math.floor(i / size);

  const hasShip = i => typeof board[i] === 'object';

  const getNeighbours = n => {
    const neighbours = i => [
      i - 1,
      i + 1,
      i - size,
      i + size,
      i - 1 - size,
      i + 1 - size,
      i - 1 + size,
      i + 1 + size
    ];
    const isValid = (coord, nCoord) => Math.abs(coord - nCoord) <= 1;
    return neighbours(n).filter(
      nb =>
        isValid(getXCoord(nb), getXCoord(n)) &&
        isValid(getYCoord(nb), getYCoord(n))
    );
  };

  return {
    board,
    size,
    placeShips,
    receiveAttack,
    isAllShipsSunk
  };
}
