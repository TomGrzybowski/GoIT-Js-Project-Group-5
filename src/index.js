import './sass/main.scss';
import { getAndDisplayTrendingMovies } from './js/initial-fetch.js';
import './js/modal-team';

window.onload = getAndDisplayTrendingMovies(1);
