import createMovieCard from './createCards';
import { getMovieDetails } from './initial-fetch';
import loading from './loading';
import { Loading } from 'notiflix/build/notiflix-loading-aio';




async function searchMovies(keyword, page) {
  const apiKey = "7bfaca5914dfe808eee9ce7ecac1ff40";
  const url =`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}&page=${page}`;

  try{
      const response = await fetch(url);
      const data = await response.json();
      
      return data;
  } catch (error) {
      console.log(error);
  }
}

const submitBtn = document.querySelector("#search-btn");
const form = document.querySelector(".search-form")
const input = document.querySelector("#search-box"); 

let keyword;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(input.value);
  keyword = input.value;
  getAndDisplayMovies();

});


async function getAndDisplayMovies(page = 1) {
  loading();
  try {
  
   
    const movies = await searchMovies(keyword, page);
    // console.log(movies)
    const MAIN = document.querySelector('.movies__list');
    MAIN.innerHTML = '';
    for (const movie of movies.results) {
      const movieDetails = await getMovieDetails(movie.id);
   
      await createMovieCard(movieDetails);
    
      const paginationData = {
      currentPage: movies.page,
      amountOfPages: movies.total_pages,
    };
    }
  } catch (error) {
    console.log(error.message);
  }

  Loading.remove();
}




