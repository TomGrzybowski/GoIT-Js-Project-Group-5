const { Notify } = require('notiflix');

const watchedLS = [];
const queueLS = [];

export function buttonsListeners(watchedBtn, queueBtn, id) {
  watchedBtn.addEventListener('click', () => {
    console.log('hello');
    addtoWatched(watchedBtn, id);
  });
  queueBtn.addEventListener('click', () => {
    addtoQueue(queueBtn, id);
  });
}

const addtoWatched = (watchedBtn, id) => {
  if (!watchedLS.includes(id)) {
    watchedLS.push(id);
    console.log(watchedLS);
    window.localStorage.setItem('watched', JSON.stringify(watchedLS));
    watchedBtn.textContent = 'ADDED TO WATCHED';
    setTimeout(() => {
      watchedBtn.textContent = 'REMOVE FROM WATCHED';
    }, 1000);
    Notify.success('ADDED TO WATCHED');
  } else {
    watchedLS.splice(watchedLS.indexOf(id), 1);
    window.localStorage.setItem('watched', JSON.stringify(watchedLS));
    watchedBtn.textContent = 'REMOVED FROM WATCHED';
    Notify.success('REMOVED FROM WATCHED');
    setTimeout(() => {
      watchedBtn.textContent = 'ADD TO WATCHED';
    }, 1000);
  }
};

const addtoQueue = (queueBtn, id) => {
  if (!queueLS.includes(id)) {
    queueLS.push(id);
    console.log(queueLS);
    window.localStorage.setItem('queue', JSON.stringify(queueLS));
    queueBtn.textContent = 'ADDED TO QUEUE';
    setTimeout(() => {
      queueBtn.textContent = 'REMOVE FROM QUEUE';
    }, 1000);
    Notify.success('ADDED TO QUEUE');
  } else {
    queueLS.splice(queueLS.indexOf(id), 1);
    window.localStorage.setItem('queue', JSON.stringify(queueLS));
    queueBtn.textContent = 'REMOVED FROM QUEUE';
    Notify.success('REMOVED FROM QUEUE');
    setTimeout(() => {
      queueBtn.textContent = 'ADD TO QUEUE';
    }, 1000);
  }
};
