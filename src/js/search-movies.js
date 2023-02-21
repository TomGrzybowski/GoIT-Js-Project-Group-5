import createMovieCard from './createCards';
import { getMovieDetails } from './initial-fetch';
import loading from './loading';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import {
  createPagination,
  pageSelectorClickHandler,
  trendingPageSelectorClickHandler,
} from './pagination';

const alert = document.querySelector('.header__info');

async function searchMovies(keyword, page) {
  const apiKey = '7bfaca5914dfe808eee9ce7ecac1ff40';
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

const submitBtn = document.querySelector('#search-btn');
const form = document.querySelector('.search-form');
const input = document.querySelector('#search-box');

let keyword;

if (input) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    keyword = input.value;
    getAndDisplayMovies();
  });
}
export async function getAndDisplayMovies(page = 1) {
  alert.classList.add('hidden');
  loading();
  const pagination = document.querySelector('.movies__pagination');

  pagination.removeEventListener('click', pageSelectorClickHandler);
  pagination.removeEventListener('click', trendingPageSelectorClickHandler);

  try {
    const movies = await searchMovies(keyword, page);

    const MAIN = document.querySelector('.movies__list');

    MAIN.innerHTML = '';

    const results = movies.results;

    if (results.length === 0) {
      alert.classList.remove('hidden');
    }

    for (const movie of movies.results) {
      const movieDetails = await getMovieDetails(movie.id);

      await createMovieCard(movieDetails);
    }
    const paginationData = {
      currentPage: movies.page,
      totalPages: movies.total_pages,
    };

    createPagination(paginationData, 'searched');
  } catch (error) {
    console.log(error.message);
  }

  Loading.remove();
}
