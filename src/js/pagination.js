import { getAndDisplayTrendingMovies } from './initial-fetch';
import { getAndDisplayMovies } from './search-movies';

function checkAndRemoveArrows(currentPage, totalPages) {
  const leftArrow = document.querySelector('#prev-button');
  const rightArrow = document.querySelector('#next-button');

  if (currentPage === 1) {
    leftArrow.classList.add('hidden');
  } else {
    leftArrow.classList.remove('hidden');
  }
  if (currentPage === totalPages) {
    rightArrow.classList.add('hidden');
  } else {
    rightArrow.classList.remove('hidden');
  }
}

function checkAndRemoveDots(currentPage, totalPages) {
  const leftDots = document.querySelector('#prev-dots');
  const rightDots = document.querySelector('#next-dots');

  if (currentPage <= 4) {
    leftDots.classList.add('hidden');
  } else {
    leftDots.classList.remove('hidden');
  }
  if (currentPage >= totalPages - 3 || totalPages < 7 || totalPages <= 5) {
    rightDots.classList.add('hidden');
  } else {
    rightDots.classList.remove('hidden');
  }
}

export function createPagination({ currentPage, totalPages }, source) {
  const pagination = document.querySelector('.movies__pagination');
  const buttons = pagination.querySelectorAll('.pagination-button');

  checkAndRemoveArrows(currentPage, totalPages);
  checkAndRemoveDots(currentPage, totalPages);

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];

    if (i === 0) {
      //arrow left
      button.dataset.goToPage = currentPage - 1;
    }

    if (i === 2 || i === 8) {
      continue;
    }

    if (i === 1) {
      //button 1
      if (currentPage > 3) {
        button.classList.remove('hidden');
        continue;
      } else if (currentPage <= 3) {
        button.classList.add('hidden');
      }
    }
    if (i === 3) {
      //button 2
      if (currentPage - 2 > 0) {
        button.textContent = currentPage - 2;
        button.dataset.goToPage = currentPage - 2;
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }
    }

    if (i === 4) {
      //button 3
      if (currentPage - 1 > 0) {
        button.textContent = currentPage - 1;
        button.dataset.goToPage = currentPage - 1;
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }
    }

    if (i === 5) {
      //button 4
      button.textContent = currentPage;
      button.dataset.goToPage = currentPage;
    }

    if (i === 6) {
      //button 5
      if (currentPage + 1 <= totalPages) {
        button.textContent = currentPage + 1;
        button.dataset.goToPage = currentPage + 1;
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }
    }
    if (i === 7) {
      //button 6
      if (currentPage + 2 <= totalPages) {
        button.textContent = currentPage + 2;
        button.dataset.goToPage = currentPage + 2;
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }
    }

    if (i === 9) {
      //last page button
      if (totalPages > currentPage + 2) {
        button.textContent = totalPages;
        button.dataset.goToPage = totalPages;
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }
    }

    if (i === 10) {
      //arrow right
      button.dataset.goToPage = currentPage + 1;
    }

    if (Number(button.dataset.goToPage) === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  }

  if (source === 'searched') {
    pagination.addEventListener('click', pageSelectorClickHandler);
  } else if (source === 'trending') {
    pagination.addEventListener('click', trendingPageSelectorClickHandler);
  }
}

export function pageSelectorClickHandler(e) {
  const target = e.target;
  if (target.classList.contains('pagination-button'))
    getAndDisplayMovies(Number(target.dataset.goToPage));
}

export function trendingPageSelectorClickHandler(e) {
  const target = e.target;
  if (target.classList.contains('pagination-button'))
    getAndDisplayTrendingMovies(Number(target.dataset.goToPage));
}
