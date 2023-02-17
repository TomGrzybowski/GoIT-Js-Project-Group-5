import createMovieCard from './createCards';
import { getMovieDetails } from './initial-fetch';
import loading from './loading';
import { Loading } from 'notiflix/build/notiflix-loading-aio';


async function searchMovies(keyword) {
  const apiKey = "7bfaca5914dfe808eee9ce7ecac1ff40";
  const url =`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`;

  try{
      const response = await fetch(url);
      const data = await response.json();
      
      return data.results;
  } catch (error) {
      console.log(error);
  }
}

let keyword = "action"


async function getAndDisplayMovies() {
  loading();
  try {
    
    const movies = await searchMovies(keyword);
    console.log(movies)
    const MAIN = document.querySelector('.movies__list');
    MAIN.innerHTML = '';
    for (const movie of movies) {
      const movieDetails = await getMovieDetails(movie.id);
      
      if (movieDetails.poster_path !== null) {
        await createMovieCard(movieDetails);
      }
    }
  } catch (error) {
    console.log(error.message);
  }

  Loading.remove();
}

getAndDisplayMovies();

  