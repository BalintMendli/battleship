import Ship from '../src/objects/ship';

test('Ship has a length', () => {
  const ship1 = Ship(4);
  expect(ship1.length).toEqual(4);
});

test('Ship sunks when all positions have been hit', () => {
  const ship1 = Ship(2);
  expect(ship1.isSunk()).toBe(false);
  ship1.hit(0);
  expect(ship1.isSunk()).toBe(false);
  ship1.hit(1);
  expect(ship1.isSunk()).toBe(true);
});
