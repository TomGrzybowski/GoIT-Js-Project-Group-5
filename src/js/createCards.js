import { addModal } from './modal-film';

export default function createMovieCard(
  { title, image, genres, year, rating },
  viewRating = false
) {
  const listItem = document.createElement('li');
  listItem.classList.add('movie-card');

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('movie-card__image');
  const IMG_HTML = `<img class="image" src="${image}" alt="${title} poster">`;
  imageDiv.insertAdjacentHTML('beforeend', IMG_HTML);

  const details = document.createElement('div');
  details.classList.add('movie-card__details');

  const titleParagraph = document.createElement('p');
  titleParagraph.classList.add('movie-title');
  titleParagraph.innerText = title.toUpperCase();

  const genreParagraph = document.createElement('p');
  genreParagraph.classList.add('movie-genre');
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
  addModal(listItem);
}
