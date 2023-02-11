import axios from 'axios';

const movieImage = document.querySelector('.movie-card__image');

const importQueue = document.querySelector('.btn-import');
const importQueueBox = document.querySelector('.import');

const params = {
  KEY: `4e7929e7857820c6b400adab328687af`, //API KEY
  PAGE: 1,
  LANGUAGE: 'en-US',
};

const { KEY, PAGE, LANGUAGE } = params;
//API DOKUMENTACJA     https://developers.themoviedb.org/3/search/search-keywords

async function fetchMovies() {
  try {
    const url = new URL('https://api.themoviedb.org/3/movie/popular');
    url.searchParams.set('api_key', KEY);
    url.searchParams.set('page', PAGE);
    url.searchParams.set('language', LANGUAGE);

    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log('ERROR FETCH', error);
    return error;
  }
}
function build(result, parent) {
  result.forEach(el => {
    const image = document.createElement('img');
    const img = `https://image.tmdb.org/t/p/w500${result.backdrop_path}`;
    image.setAttribute('src', img);
    movieImage.appendChild(image);
    image.classList.add('image');

    const title = document.createElement('p');
    title.textContent = result.title;
    movieImage.appendChild(title);
  });

  //   const button = document.createElement('button');
  //   button.classList.add('button');
  //   button.textContent = 'Click me';
  //   movieCard.appendChild(button);
  //   button.addEventListener('click', () => {
  //     queueExport(result);
  //   });
}

const queue = [];
function queueExport(result) {
  queue.push(result.title);
  window.localStorage.setItem('Queue', JSON.stringify(queue));
}

fetchMovies().then(function (response) {
  const moviesresults = response.data.results;
  console.log('ARRAY OF MOVIE RESULTS', moviesresults);
  moviesresults.forEach(result => {
    build(result, movieImage);
  });
});

importQueue.addEventListener('click', () => {
  const getItems = window.localStorage.getItem('Queue');
  const parsed = JSON.parse(getItems);

  fetchMovies().then(function (items) {
    const results = items.data.results;

    parsed.forEach(parsedItem => {
      results.filter(movie => {
        if (movie.title === parsedItem) {
          build(movie, importQueueBox);
        }
      });
    });
  });
});
