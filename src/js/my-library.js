import { addModal } from './modal-film.js';
import createMovieModal from './modal-film.js';
const ACTIVE_SECTION_CLASS = 'active';
const HIDDEN_SECTION_CLASS = 'hidden';
const WATCHED_SECTION_ID = '#watched-btn';
const QUEUE_SECTION_ID = '#queue-btn';
const LOCAL_STORAGE_WATCHED_KEY = 'watched';
const LOCAL_STORAGE_QUEUE_KEY = 'queue';
const sectionButtons = document.querySelectorAll('.button-library');
const initialButton = document.getElementById(WATCHED_SECTION_ID);
const sectionContainer = document.querySelector('.movies__list');
const API_KEY = '7bfaca5914dfe808eee9ce7ecac1ff40';

async function fetchToJson(url) {
  const results = await fetch(url);
  const resultsJSON = await results.json();
  return resultsJSON;
}

async function getMovieDetails(movieId) {
  const movieDetails = await fetchToJson(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );
  const {
    id,
    title,
    poster_path,
    genres,
    release_date,
    vote_average,
    original_title,
    vote_count,
    popularity,
    overview,
  } = movieDetails;
  const trueTitle = original_title;
  const image = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const year = release_date.substring(0, 4);
  const rating = vote_average;
  const votes = vote_count;
  const genresString = genres.map(g => g.name).join(', ');

  return {
    id,
    title,
    image,
    genres: genresString,
    year,
    rating,
    trueTitle,
    votes,
    popularity,
    overview,
  };
}

//Zmiana aktywngo buttona
function markActiveButton(button) {
  sectionButtons.forEach(button =>
    button.classList.remove(ACTIVE_SECTION_CLASS)
  );
  button.classList.add(ACTIVE_SECTION_CLASS);
}

//Po kliknięciu - zmiana aktywngo buttona i wypełnienie sekcji
function initListeners() {
  sectionButtons.forEach(button =>
    button.addEventListener('click', e => {
      const isActiveButton = e.target.classList.contains('active');
      initialButton.classList.remove('button-library__initial');
      if (!isActiveButton) {
        markActiveButton(e.target);
        populateSection(e.target);
      }
    })
  );
}

//Wypełnienie sekcji danymi pobranymi z local-storage w zależności czy kliknięto button "watched" czy "queued"
function populateSection(target) {
  sectionContainer.classList.add(HIDDEN_SECTION_CLASS);
  const timeout = setTimeout(() => {
    sectionContainer.innerHTML = null;
    const selectedSectionId = target.getAttribute('id') ?? WATCHED_SECTION_ID;
    console.log(selectedSectionId);
    const elements = JSON.parse(readSectionFromLocalStorage(selectedSectionId));
    console.log(elements);
    if (elements.length > 0) {
      getMovieDetails(elements);
      elements.forEach(movieID => renderMovieElement(movieID));
    }
    sectionContainer.classList.remove(HIDDEN_SECTION_CLASS);
    clearTimeout(timeout);
  }, 300);
}

// //Renderowane gdy nie ma nic dodanego do "watched"/"queued"
// function renderEmptyState() {
//   sectionContainer.innerHTML = `
//   <div>
//   <p><strong>Please add elements to the list </strong></p>
//   </div>
//   `;
//   sectionContainer.classList.remove(HIDDEN_SECTION_CLASS);
// }

//"Czyste" odczytywanie z local-storage
function readElementsFromLocalStorage(key) {
  return localStorage.getItem(key);
}

//Odczytywanie z local-storage "watched" lub "queued"
function readSectionFromLocalStorage(sectionName) {
  let elements;
  switch (sectionName) {
    case WATCHED_SECTION_ID:
      elements = readElementsFromLocalStorage(LOCAL_STORAGE_WATCHED_KEY);
      break;
    case QUEUE_SECTION_ID:
      elements = readElementsFromLocalStorage(LOCAL_STORAGE_QUEUE_KEY);
      break;
    default:
      throw new Error('Not implemented sectionName: ' + sectionName);
  }
  return elements;
}

async function renderMovieElement(movieID) {
  const savedMovie = await getMovieDetails(movieID);
  const posterPath =
    savedMovie.image.substring(savedMovie.image.length - 4) === 'null'
      ? 'https://via.placeholder.com/500x750.png?text=No+Image+Available'
      : `https://image.tmdb.org/t/p/w500${savedMovie.image}`;

  const listItem = document.createElement('li');
  listItem.classList.add('movie-card');
  listItem.dataset.movieId = savedMovie.id;

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('movie-card__image');
  const IMG_HTML = `<img class="image" src="${savedMovie.image}" alt="${savedMovie.title} poster">`;
  imageDiv.insertAdjacentHTML('beforeend', IMG_HTML);

  const details = document.createElement('div');
  details.classList.add('movie-card__details');

  const titleParagraph = document.createElement('p');
  titleParagraph.classList.add('movie-title');
  titleParagraph.innerText = savedMovie.title.toUpperCase();

  const genreParagraph = document.createElement('p');
  genreParagraph.classList.add('movie-genre');

  if (savedMovie.genres.length === 0) {
    savedMovie.genres = 'undefined';
  }

  if (savedMovie.year === '') {
    savedMovie.year = 'undefined';
  }
  genreParagraph.innerText = `${savedMovie.genres} | ${savedMovie.year}`;

  if (savedMovie.viewRating) {
    const ratingSpan = document.createElement('span');
    ratingSpan.classList.add('movie-rating');
    ratingSpan.textContent = Math.round(rating * 100) / 100;
    genreParagraph.insertAdjacentElement('beforeend', ratingSpan);
  }

  details.insertAdjacentElement('beforeend', titleParagraph);
  details.insertAdjacentElement('beforeend', genreParagraph);

  listItem.insertAdjacentElement('beforeend', imageDiv);
  listItem.insertAdjacentElement('beforeend', details);

  const moviesList = document.querySelector('.movies__list');
  moviesList.insertAdjacentElement('beforeend', listItem);
}

function initScripts() {
  initialButton.classList.add(ACTIVE_SECTION_CLASS);
  markActiveButton(initialButton);
  initListeners();
  populateSection(initialButton);
}

if (sectionButtons.length > 0) {
  initScripts();
}
