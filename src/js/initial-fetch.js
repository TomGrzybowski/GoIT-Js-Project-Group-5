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
  return trendingMovies.results;
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

async function getAndDisplayTrendingMovies(page = 1) {
  loading();
  try {
    const trendingMovies = await getTrendingMovies(page);
    const MAIN = document.querySelector('.movies__list');
    MAIN.innerHTML = '';
    for (const movie of trendingMovies) {
      const movieDetails = await getMovieDetails(movie.id);

      await createMovieCard(movieDetails);
    }
  } catch (error) {
    console.log(error.message);
  }

  Loading.remove();
}

getAndDisplayTrendingMovies(1);

const loadButton = document.querySelector('.load-more-button');

loadButton.addEventListener('click', handleLoadMore());

async function handleLoadMore() {
  page += 1;
  getAndDisplayTrendingMovies(page);
}
