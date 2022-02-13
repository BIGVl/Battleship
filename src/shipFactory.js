export const shipFactory = (shipLength, coordinates) => {
  const length = shipLength;
  const positionArray = [];

  //The array is going to be used to remove each number that was hit
  for (let i = 1; i <= length; i++) {
    positionArray.push(i);
  }

  //Checks if the coordinates are still in the array and if they are removes and replaces them with 'hit'
  //so when the array contains only 'hit' items the isSunk function will be called
  function hit(position) {
    let checker = false;

    positionArray.forEach((coord) => {
      if (position === coord) {
        positionArray.splice(coord - 1, 1, 'hit');
        checker = true;
      }
    });

    return checker;
  }
  //Checks if the positionArray contains only 'hit' items and if it does it declares it  sunk
  function isSunk() {
    const sank = positionArray.every((ele) => {
      return ele === 'hit';
    });
    return sank;
  }

  return { hit, isSunk, length };
};
