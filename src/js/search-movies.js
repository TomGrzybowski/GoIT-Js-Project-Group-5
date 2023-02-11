import { Loading } from 'notiflix/build/notiflix-loading-aio';
import loading from './loading';

async function searchMovies(keyword) {
  const apiKey = '7bfaca5914dfe808eee9ce7ecac1ff40';
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

let keyword = 'Kungfu Panda';
searchMovies(keyword).then(movies => {
  console.log(movies);
  Loading.remove();
});

loading();
