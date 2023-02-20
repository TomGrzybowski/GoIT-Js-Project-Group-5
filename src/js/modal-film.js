import { getMovieDetails } from './initial-fetch';
import { buttonsListeners, isInWatched, isInQueue } from './local-storage';

export function addModal() {
  document.querySelector('.movies__list').addEventListener('click', openModal);
}

const modal = document.querySelector('[data-modal]');
const modalFilm = document.querySelector('.modal-film');
let movieId;
function openModal(event) {
  let movie = event.target.parentNode;
  movie = movie.parentNode;

  movieId = movie.dataset.movieId;
  console.log(movieId);
  createMovieModal(movieId);

  modal.classList.remove('is-hidden');
  modalFilm.classList.add('is-visible');
  document
    .querySelector('.movies__list')
    .removeEventListener('click', openModal);

  // let filmId = e.target.closest('li').getAttribute('data-movie-id');

  getMovieDetails(movieId)
    .then(data => {
      createMovieModal(data);
    })
    .catch(error => console.log(error));
}

//end of modal opening and closing

export function createMovieModal({
  id,
  title,
  image,
  genres,
  rating,
  trueTitle,
  votes,
  popularityFixed,
  overview,
}) {
  const filmInfoModal = `
     <button class="modal-film__close-btn" data-modal-close>
      <svg class="modal-film__close-icon">
        <use class="bug" href="./../icons/icons.svg#close" width="100" height="100"></use>
      </svg>
    </button>
    <div class="modal-film__container" data-id=${id}>
      <div class="modal-film__poster-box">
        <img
          class="modal-film__poster-img"
          src="${image}"
          alt="${title} poster"
        />
      </div>
      <div class="modal-film__info-box">
        <div class="modal-film__title">${title}</div>
        <div class="modal-film__stats">
          <table class="modal-film__table">
            <tr>
              <td class="modal-film__table-title">Vote / Votes</td>
              <td class="modal-film__table-data">
                <span class="modal-film__score">${rating}</span> /
                <span class="modal-film__total-votes">${votes}</span>
              </td>
            </tr>
            <tr>
              <td class="modal-film__table-title">Popularity</td>
              <td class="modal-film__table-data">${popularityFixed}</td>
          </tr></td>
            </tr>
            <tr>
              <td class="modal-film__table-title">Original Title</td>
              <td class="modal-film__table-data">${trueTitle}</td>
            </tr>
            <tr>
              <td class="modal-film__table-title">Genre</td>
              <td class="modal-film__table-data">${genres}</td>
            </tr>
          </table>
        </div>
        <div class="modal-film__about">
          <p class="modal-film__about-title">ABOUT</p>
          <p class="modal-film__about-txt">${overview}</p>
        </div>
        <div class="modal-film__btn">
          <button id="watched" class="modal-film__btn-watched" type="button">
            ADD TO WATCHED
          </button>
          <button id="queue" class="modal-film__btn-queue" type="button">
            ADD TO QUEUE
          </button>
        </div>
      </div>
    </div>`;

  if (image === '' || null) {
    image = 'https://via.placeholder.com/500x750.png?text=No+Image+Available';
  }
  if (title === '') {
    title = 'No title available';
  }
  if (trueTitle === '') {
    trueTitle = 'Not available';
  }
  if (rating === '' || 0) {
    rating = 'not available';
  }

  if (votes === '' || 0) {
    votes = 'not available';
  }
  if (popularityFixed === '' || 0) {
    popularity = 'not available';
  }
  if (genres === 0) {
    genres = 'not available';
  }
  if (overview === '' || null) {
    overview = 'Description not available';
  }

  addFilmInfoModal(filmInfoModal);
}

function addFilmInfoModal(filmInfoModal) {
  removeFilmInfoModal();
  modalFilm.insertAdjacentHTML('beforeend', filmInfoModal);
  const watchedBtn = document.querySelector('#watched');
  const queueBtn = document.querySelector('#queue');
  if (isInWatched(movieId)) {
    watchedBtn.textContent = 'REMOVE FROM WATCHED';
  }
  if (isInQueue(movieId)) {
    queueBtn.textContent = 'REMOVE FROM QUEUE';
  }
  buttonsListeners(watchedBtn, queueBtn, movieId);
  const closeBtn = document.querySelector('.modal-film__close-btn');
  closeModalEvents(closeBtn);
}

function removeFilmInfoModal() {
  modalFilm.innerHTML = '';
}

const closeModal = () => {
  modal.classList.add('is-hidden');
  modalFilm.classList.remove('is-visible');
  addModal();
};

function closeModalEvents(closeBtn) {
  closeBtn.addEventListener('click', function close() {
    closeModal();
  });

  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };

  document.addEventListener('keyup', function escapeClose(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}
