//  пошук елементів у DOM
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

//  стилізація кнопок
startBtn.style.paddingTop = '10px';
startBtn.style.paddingBottom = '10px';
startBtn.style.paddingLeft = '15px';
startBtn.style.paddingRight = '15px';
startBtn.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)';
startBtn.style.borderRadius = '5px';
startBtn.style.border = '0px';

stopBtn.style.paddingTop = '10px';
stopBtn.style.paddingBottom = '10px';
stopBtn.style.paddingLeft = '15px';
stopBtn.style.paddingRight = '15px';
stopBtn.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)';
stopBtn.style.borderRadius = '5px';
stopBtn.style.border = '0px';

// Запис початкового значення intervalId
let intervalId = null;

//  Встановлення початкового значення для кнопки STOP
stopBtn.disabled = true;

//  Функція створення випадкового кольору у форматі HEX
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// створення колбек-функцій для слухачів подій для кнопок Start і Stop
const onStartBtnClick = () => {
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);
  stopBtn.disabled = false;
  startBtn.disabled = true;
};

const onStopBtnClick = () => {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

// додавання слухачів подій для кнопок
startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);
