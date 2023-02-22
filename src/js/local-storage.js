const { Notify } = require('notiflix');

export function buttonsListeners(watchedBtn, queueBtn, id) {
  watchedBtn.addEventListener('click', () => {
    addtoWatched(watchedBtn, id);
  });
  queueBtn.addEventListener('click', () => {
    addtoQueue(queueBtn, id);
  });
}

export const isInWatched = id => {
  const watched = JSON.parse(localStorage.getItem('watched')) || [];
  return watched.includes(id);
};
export const isInQueue = id => {
  const queue = JSON.parse(localStorage.getItem('queue')) || [];
  return queue.includes(id);
};
const addtoWatched = (watchedBtn, id) => {
  const watched = JSON.parse(localStorage.getItem('watched')) || [];
  if (!isInWatched(id)) {
    watched.push(id);
    localStorage.setItem('watched', JSON.stringify(watched));

    watchedBtn.textContent = 'ADDED TO WATCHED';
    setTimeout(() => {
      watchedBtn.textContent = 'REMOVE FROM WATCHED';
    }, 1000);
    Notify.success('Successfully added to watched');
  } else {
    watched.splice(watched.indexOf(id), 1);
    localStorage.setItem('watched', JSON.stringify(watched));

    watchedBtn.textContent = 'REMOVED FROM WATCHED';
    Notify.success('Successfully removed from watched');
    setTimeout(() => {
      watchedBtn.textContent = 'ADD TO WATCHED';
    }, 1000);
  }
};

const addtoQueue = (queueBtn, id) => {
  const queue = JSON.parse(localStorage.getItem('queue')) || [];
  if (!isInQueue(id)) {
    queue.push(id);

    localStorage.setItem('queue', JSON.stringify(queue));

    queueBtn.textContent = 'ADDED TO QUEUE';
    setTimeout(() => {
      queueBtn.textContent = 'REMOVE FROM QUEUE';
    }, 1000);
    Notify.success('Successfully added to queue');
  } else {
    queue.splice(queue.indexOf(id), 1);
    localStorage.setItem('queue', JSON.stringify(queue));
    queueBtn.textContent = 'REMOVED FROM QUEUE';
    Notify.success('Successfully removed from queue');
    setTimeout(() => {
      queueBtn.textContent = 'ADD TO QUEUE';
    }, 1000);
  }
};
