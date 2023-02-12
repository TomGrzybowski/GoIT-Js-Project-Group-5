import createMovieCard from './createCards';
import loading from './loading';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const API_KEY = '7bfaca5914dfe808eee9ce7ecac1ff40';

async function getTrendingMovies() {
  const trendingMoviesResponse = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
  );
  const trendingMovies = await trendingMoviesResponse.json();
  return trendingMovies.results;
}

async function getMovieDetails(movieId) {
  const movieDetailsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );
  const movieDetails = await movieDetailsResponse.json();

  const { title, poster_path, genres, release_date, vote_average } =
    movieDetails;

  const image = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const year = release_date.substring(0, 4);
  const rating = vote_average;
  const genresString = genres.map(g => g.name).join(', ');

  return { title, image, genres: genresString, year, rating };
}

async function getAndDisplayTrendingMovieDetails() {
  loading();
  const trendingMovies = await getTrendingMovies();
  const MAIN = document.querySelector('.movies__list');
  MAIN.innerHTML = '';
  for (const movie of trendingMovies) {
    const movieDetails = await getMovieDetails(movie.id);

    await createMovieCard(movieDetails);
  }

  Loading.remove();
}

getAndDisplayTrendingMovieDetails();
