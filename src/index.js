import './sass/main.scss';
import { getAndDisplayTrendingMovies } from './js/initial-fetch.js';

window.onload = getAndDisplayTrendingMovies(1);
