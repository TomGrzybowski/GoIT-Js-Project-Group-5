import createMovieCard from './createCards';
import { createMovieModal } from './modal-film';
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

export async function getMovieDetails(movieId) {
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

export async function getAndDisplayTrendingMovies(page = 1) {
  loading();
  try {
    const trendingMovies = await getTrendingMovies(page);

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
  } catch (error) {
    console.log(error.message);
  }

  Loading.remove();
}
