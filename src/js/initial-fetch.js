import createMovieCard from './createCards';
import loading from './loading';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const API_KEY = '7bfaca5914dfe808eee9ce7ecac1ff40';

async function fetchToJson(url) {
  const results = await fetch(url);
  const resultsJSON = await results.json();
  return resultsJSON;
}

async function getTrendingMovies(page = 1) {
  const trendingMovies = await fetchToJson(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`
  );
  return trendingMovies;
}

async function getMovieDetails(movieId) {
  const movieDetails = await fetchToJson(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );

  const { title, poster_path, genres, release_date, vote_average } =
    movieDetails;

  const image = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const year = release_date.substring(0, 4);
  const rating = vote_average;
  const genresString = genres.map(g => g.name).join(', ');

  return { title, image, genres: genresString, year, rating };
}

export async function getAndDisplayTrendingMovies(page = 1) {
  loading();
  try {
    const trendingMovies = await getTrendingMovies(1);

    const MAIN = document.querySelector('.movies__list');

    MAIN.innerHTML = '';
    for (const movie of trendingMovies.results) {
      const movieDetails = await getMovieDetails(movie.id);

      await createMovieCard(movieDetails);
    }
    const paginationData = {
      currentPage: trendingMovies.page,
      amountOfPages: trendingMovies.total_pages,
    };

    createPagination(paginationData);
  } catch (error) {
    console.log(error.message);
  }

  Loading.remove();
}

//
//

//
//

//
//
function createPagination({ currentPage, amountOfPages }) {
  const nextButton = document.querySelector('#next-button');
  const prevButton = document.querySelector('#prev-button');
  const paginationNumbers = document.querySelector('.pagination-numbers');
  const prevDots = document.querySelector('#prev-dots');
  const nextDots = document.querySelector('#next-dots');
  const currentPageButton = document.querySelector(
    `.pagination-button-${currentPage}`
  );

  function paginationButtonCreation(currentPage) {
    const paginationButton = document.createElement('button');
    paginationButton.classList.add('pagination-button');
    paginationButton.classList.add(`pagination-button-${currentPage}`);
    paginationButton.innerHTML = currentPage;

    paginationNumbers.insertAdjacentElement('beforeend', paginationButton);
  }

  const getPaginationButtons = () => {
    for (let i = 2; i <= 6; i++) {
      paginationButtonCreation(i);
      const selectedButton = document.querySelector(`.pagination-button-${i}`);

      selectedButton.textContent = currentPage + (i - 2);

      if (currentPage === currentPage + (i - 2)) {
        selectedButton.classList.add('active');
      }
      const firstButton = document.querySelector('.pagination-button-1');
      const lastButton = document.querySelector('.pagination-button-7');
      firstButton.classList.add('hidden');
      lastButton.textContent = amountOfPages;
    }

    if (currentPage === 1) {
      prevButton.classList.add('hidden');
      prevDots.classList.add('hidden');
    }
    if (currentPage === amountOfPages) {
      nextButton.classList.add('hidden');
      nextDots.classList.add('hidden');
    }
  };
  getPaginationButtons();

  // function dotsAndArrowsRemoval(currentPage, amountOfPages) {}

  const button = document.querySelector('.pagination-button');
  button.addEventListener('click', handleActivePageNumber(currentPage));
  console.log(currentPage);
}

//

//

//
//
//
//
//
//
//
//
