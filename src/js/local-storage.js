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
    watchedBtn.textContent = 'Added to watched';
    setTimeout(() => {
      watchedBtn.textContent = 'remove from watched';
    }, 1000);
    Notify.success('Added to watched');
  } else {
    watchedLS.splice(watchedLS.indexOf(id), 1);
    window.localStorage.setItem('watched', JSON.stringify(watchedLS));
    watchedBtn.textContent = 'removed from watched';
    Notify.success('Removed from watched');
    setTimeout(() => {
      watchedBtn.textContent = 'add to queue';
    }, 1000);
  }
};

const addtoQueue = (queueBtn, id) => {
  if (!queueLS.includes(id)) {
    queueLS.push(id);
    console.log(queueLS);
    window.localStorage.setItem('queue', JSON.stringify(queueLS));
    queueBtn.textContent = 'Added to queue';
    setTimeout(() => {
      queueBtn.textContent = 'remove from queue';
    }, 1000);
    Notify.success('Added to queue');
  } else {
    queueLS.splice(queueLS.indexOf(id), 1);
    window.localStorage.setItem('queue', JSON.stringify(queueLS));
    queueBtn.textContent = 'removed from queue';
    Notify.success('Removed from queue');
    setTimeout(() => {
      queueBtn.textContent = 'add to queue';
    }, 1000);
  }
};
