export const startScreen = () => {
  const body = document.querySelector('body');
  const mainBody = document.createElement('div');
  const pvp = document.createElement('button');
  pvp.textContent = 'Player vs Player';
  const pvc = document.createElement('button');
  pvc.textContent = 'Player vs Computer';

  mainBody.appendChild(pvp).classList.add('start-pvp');
  mainBody.appendChild(pvc).classList.add('start-pvc');
  body.appendChild(mainBody).classList.add('start-body');

  return { pvp, pvc };
};
