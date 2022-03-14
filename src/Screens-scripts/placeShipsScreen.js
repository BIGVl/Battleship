import { createDOM, manipulateDOM } from '../DOM';

export const placeShipsScreen = () => {
  const body = document.querySelector('body');
  const overlay = document.createElement('div');
  const shitButton = document.createElement('button');
  const finishPlacement = document.createElement('button');
  shitButton.textContent = 'Done';

  overlay.appendChild(shitButton).classList.add('shift-overlay');
  body.appendChild(overlay).classList.add('place-overlay');

  shitButton.addEventListener('click', () => {
    overlay.classList.add('nd');
  });
};
