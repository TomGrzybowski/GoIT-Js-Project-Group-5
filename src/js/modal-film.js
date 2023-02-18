export function addModal(listItem) {
  openModal(listItem);
  closeModal();
  createFilmModal();
}

const modal = document.querySelector('[data-modal]');
const modalFilm = document.querySelector('.modal-film');

const openModal = listItem => {
  listItem.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
};

const closeModal = () => {
  document
    .querySelector('.modal-film__close-btn')
    .addEventListener('click', () => {
      modal.classList.add('hidden');
    });

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.classList.add('hidden');
    }
  };
};

//end of modal opening and closing

function createFilmModal({
  poster_path,
  title,
  vote_avarage,
  vote_count,
  popularity,
  genres,
  overview,
  id,
}) {
  const filmInfoModal = `<div class="modal-film__container" data-id=${id}>
      <div class="modal-film__poster-box">
        <img
          class="modal-film__poster-img"
          src="${poster_path}"
          alt="${title}"
        />
      </div>
      <div class="modal-film__info-box">
        <div class="modal-film__title">${title}</div>
        <div class="modal-film__stats">
          <table class="modal-film__table">
            <tr>
              <td class="modal-film__table-title">Vote / Votes</td>
              <td class="modal-film__table-data">
                <span class="modal-film__score">${vote_average}</span> /
                <span class="modal-film__total-votes">${vote_count}</span>
              </td>
            </tr>
            <tr>
              <td class="modal-film__table-title">Popularity</td>
              <td class="modal-film__table-data">${popularity}</td>
          </tr></td>
            </tr>
            <tr>
              <td class="modal-film__table-title">Original Title</td>
              <td class="modal-film__table-data">${title}</td>
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
  addFilmInfoModal(filmInfoModal);
}

function addFilmInfoModal(markup) {
  removeFilmInfoModal();
  modalFilm.insertAdjacentHTML('beforeend', markup)
}

function removeFilmInfoModal() {
  modalFilm.innerHTML = "";
}

