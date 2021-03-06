export const shipFactory = (len) => {
  const length = len;
  const positionsArray = [];

  for (let i = 0; i <= length; i++) {
    positionsArray.push(i);
  }

  let i = 0;

  function hit() {
    positionsArray.splice(i, 1, 'hit');
    console.log(positionsArray);

    if (isSunk()) {
      return 'SUNK!';
    }
    i++;
    return 'hit';
  }

  function isSunk() {
    return positionsArray.every((position) => {
      return position === 'hit';
    });
  }

  return { length, hit };
};
