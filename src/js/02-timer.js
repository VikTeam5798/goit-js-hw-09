// Додавання бібліотек
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//  Пошук елементів у DOM
const dateInput = document.getElementById('datetime-picker');
const startCountdownBtn = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

//  Встановлення початкових значень для дат айдішника таймеру та кнопки запуску
let targetTime = null;
let startTime = null;
let timerId = null;
startCountdownBtn.disabled = true;

//  об'єкт налаштування для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCheckDate(selectedDates);
  },
};

// Ініціалізація бібліотеки
flatpickr(dateInput, options);

//  функція для присвоєння значення поточної дати і обраної дати в календарі, а також
//  визначення умови за якої буде повідомлення про помилку, або кнопка стане активною
//  для запуску таймера
function onCheckDate(selectedDates) {
  targetTime = selectedDates[0].getTime();
  startTime = new Date().getTime();
  if (targetTime < startTime) {
    Notify.failure('Please choose a date in the future');
  } else {
    startCountdownBtn.disabled = false;
  }
}

//  створення колбек-функції для слухача події на кнопці запуску таймера
const onStartCountdownBtnClick = () => {
  timerId = setInterval(() => {
    startTime = new Date().getTime();
    const deltaTime = targetTime - startTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      dateInput.disabled = false;
    } else {
      const time = convertMs(deltaTime);
      startCountdownBtn.disabled = true;
      dateInput.disabled = true;
      updateClockface(time);
    }
  }, 1000);
};

//  функція для підрахунку значень днів, годин, хвилин і секунд
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

//  функція для додавання нуля в інтерфейсі таймера, якщо в числі менше двох символів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//  додавання слухача події для кнопки запуску таймера
startCountdownBtn.addEventListener('click', onStartCountdownBtnClick);

// функція для оновлення інтерфейсу таймера
function updateClockface({ days, hours, minutes, seconds }) {
  daysSpan.textContent = days;
  hoursSpan.textContent = hours;
  minutesSpan.textContent = minutes;
  secondsSpan.textContent = seconds;
}
