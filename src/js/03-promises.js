//  Додавання бібліотеки для повідомлень користувачеві
import { Notify } from 'notiflix';

//  Функція для створення проміса
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

//  Пошук елементів у DOM
const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name = "delay"]');
const stepInput = document.querySelector('input[name = "step"]');
const amountInput = document.querySelector('input[name = "amount"]');

// Додавання події при сабміті форми
form.addEventListener('submit', e => {
  //  Уникнення поведінки за замовчуванням при сабміті(перезавантаження сторінки)
  e.preventDefault();

  // Запис значень інпутів у змінні(значееня затримки і кроку затримки приведені до числа
  // для можливості подальшого додавання їх значень)
  const firstDelay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = amountInput.value;

  // цикл для виклику функції createPromise стільки разів, скільки вказано в input.amount
  for (let i = 0; i < amount; i += 1) {
    // Запис позиції промісу, що створюється
    let promisePosition = i + 1;

    //  Запис загальної затримки промісу
    let promiseDelay = firstDelay + step * i;

    createPromise(promisePosition, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
});
