export const shipFactory = (len) => {
  const length = len;
  const positionsArray = [];

  for (let i = 0; i < length; i++) {
    positionsArray.push(i);
  }

  function hit(hitPosition) {
    const hit = hitPosition - 1;
    positionsArray.splice(hit, 1, 'hit');

    if (isSunk()) {
      return 'SUNK!';
    }

    return 'hit';
  }

  function isSunk() {
    return positionsArray.every((position) => {
      return position === 'hit';
    });
  }

  return { length, hit };
};
