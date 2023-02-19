import { addModal } from './modal-film';

export default function createMovieCard(
  { id, title, image, genres, year, rating },
  viewRating = false
) {
  const movieGenre = document.querySelector('.movie-genre');

  const posterPath =
    image.substring(image.length - 4) === 'null'
      ? 'https://via.placeholder.com/500x750.png?text=No+Image+Available'
      : `https://image.tmdb.org/t/p/w500${image}`;

  const listItem = document.createElement('li');
  listItem.classList.add('movie-card');
  listItem.dataset.movieId = id;

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('movie-card__image');
  const IMG_HTML = `<img class="image" src="${posterPath}" alt="${title} poster">`;
  imageDiv.insertAdjacentHTML('beforeend', IMG_HTML);

  const details = document.createElement('div');
  details.classList.add('movie-card__details');

  const titleParagraph = document.createElement('p');
  titleParagraph.classList.add('movie-title');
  titleParagraph.innerText = title.toUpperCase();

  const genreParagraph = document.createElement('p');
  genreParagraph.classList.add('movie-genre');

  if (genres.length === 0) {
    genres = 'undefined';
  }

  if (year === '') {
    year = 'undefined';
  }
  genreParagraph.innerText = `${genres} | ${year}`;

  if (viewRating) {
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

  addModal();
}
