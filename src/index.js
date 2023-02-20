import './sass/main.scss';
import './js/initial-fetch.js';
import { getAndDisplayTrendingMovies } from './js/initial-fetch.js';
import './js/search-movies.js';
import './js/modal-film';
import './js/modal-team';
import './js/local-storage';
import './js/my-library.js';
window.onload = getAndDisplayTrendingMovies(1);
