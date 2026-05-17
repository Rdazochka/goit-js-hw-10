import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
      });
      btn.disabled = true;
      return;
    }

    btn.disabled = false;
  },
};

const inputFlat = document.querySelector('#datetime-picker');
// console.log(inputFlat);

flatpickr(inputFlat, options);

const btn = document.querySelector('[data-start]');
// console.log(btn);
const secondEl = document.querySelector('[data-seconds]');
const minuteEl = document.querySelector('[data-minutes]');
const hourEl = document.querySelector('[data-hours]');
const dayEl = document.querySelector('[data-days]');

btn.disabled = true;

btn.addEventListener('click', () => {
  btn.disabled = true;
  inputFlat.disabled = true;

  const timerEnd = setInterval(() => {
    const date = userSelectedDate - new Date();

    if (date <= 0) {
      clearInterval(timerEnd);
      inputFlat.disabled = false;
      btn.disabled = true;
      return;
    }

    const time = convertMs(date);
    secondEl.textContent = convertTime(time.seconds);
    minuteEl.textContent = convertTime(time.minutes);
    hourEl.textContent = convertTime(time.hours);
    dayEl.textContent = convertTime(time.days);
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function convertTime(value) {
  const newTime = String(value).padStart(2, '0');
  return newTime;
}
