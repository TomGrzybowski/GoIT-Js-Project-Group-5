export default function createMovieCard({
  title,
  image,
  genres,
  year,
  rating,
}) {
  const LI = document.createElement('li');
  LI.classList.add('movie-card');

  const IMAGE_DIV = document.createElement('div');
  IMAGE_DIV.classList.add('movie-card__image');
  const IMG_HTML = `<img class="image" src="${image}" alt="${title} poster">`;
  IMAGE_DIV.insertAdjacentHTML('beforeend', IMG_HTML);

  const DETAILS = document.createElement('div');
  DETAILS.classList.add('movie-card__details');

  const TITLE = document.createElement('p');
  TITLE.classList.add('movie-title');
  TITLE.innerText = title.toUpperCase();

  const GENRE = document.createElement('p');
  GENRE.classList.add('movie-genre');
  GENRE.innerText = `${genres} | ${year}`;

  DETAILS.insertAdjacentElement('beforeend', TITLE);
  DETAILS.insertAdjacentElement('beforeend', GENRE);

  LI.insertAdjacentElement('beforeend', IMAGE_DIV);
  LI.insertAdjacentElement('beforeend', DETAILS);

  const LIST = document.querySelector('.movies__list');
  LIST.insertAdjacentElement('beforeend', LI);
}
