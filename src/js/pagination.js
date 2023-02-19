// export function createPagination({ currentPage, amountOfPages }) {
//   const nextButton = document.querySelector('#next-button');
//   const prevButton = document.querySelector('#prev-button');
//   const paginationNumbers = document.querySelector('.pagination-numbers');
//   const prevDots = document.querySelector('#prev-dots');
//   const nextDots = document.querySelector('#next-dots');
//   const currentPageButton = document.querySelector(
//     `.pagination-button-${currentPage}`
//   );

import { getAndDisplayTrendingMovies } from './initial-fetch';

//   //   function paginationButtonCreation(currentPage) {
//   //     const paginationButton = document.createElement('button');
//   //     paginationButton.classList.add('pagination-button');
//   //     paginationButton.classList.add(`pagination-button-${currentPage}`);
//   //     paginationButton.innerHTML = currentPage;

//   //     paginationNumbers.insertAdjacentElement('beforeend', paginationButton);
//   //   }

//   const getPaginationButtons = () => {
//     // for (let i = 2; i <= 6; i++) {
//     //   //   paginationButtonCreation(i);
//     //   const selectedButton = document.querySelector(`.pagination-button-${i}`);
//     //   selectedButton.textContent = currentPage + (i - 2);
//     //   if (currentPage === currentPage + (i - 2)) {
//     //     selectedButton.classList.add('active');
//     //   }
//     //   const firstButton = document.querySelector('.pagination-button-1');
//     //   const lastButton = document.querySelector('.pagination-button-7');
//     //   firstButton.classList.add('hidden');
//     //   lastButton.textContent = amountOfPages;
//     // }
//   };
//   checkAndRemoveArrows(currentPage, amountOfPages);
//   checkAndRemoveDots(currentPage, amountOfPages);
//   setupButtons(currentPage, amountOfPages);
//   getPaginationButtons();

//   // function dotsAndArrowsRemoval(currentPage, amountOfPages) {}

//   //   const button = document.querySelector('.pagination-button');
//   //   button.addEventListener('click', handleActivePageNumber(currentPage));
//   //   console.log(currentPage);
// }

// // function setupButtons(currentPage, totalPages) {
// //   let currentButton = document.querySelector(`.pagination-button-4`);
// //   const lastButton = document.querySelector('.pagination-button-7');
// //   const rightDots = document.querySelector('#next-dots');
// //   //Jeśli mniej nic 7 stron to usun niepotrzebne buttony
// //   if (totalPages < 7) {
// //     for (let i = 7; i > totalPages; i--) {
// //       const ithButton = document.querySelector(`.pagination-button-${i}`);
// //       if (i > totalPages) {
// //         ithButton.classList.add('hidden');
// //       }
// //     }
// //   }

// //   //szczególne przypadki
// //   if (currentPage <= 3) {
// //     currentButton = document.querySelector(`.pagination-button-${currentPage}`);
// //     currentButton.classList.add('active');
// //     for (let i = currentPage + 3; i <= 6; i++) {
// //       const selectedButton = document.querySelector(`.pagination-button-${i}`);
// //       selectedButton.classList.add('hidden');
// //     }
// //     console.log(totalPages, currentPage + 2);
// //     if (totalPages > currentPage + 2) {
// //       lastButton.classList.remove('hidden');
// //       rightDots.classList.remove('hidden');
// //       lastButton.textContent = totalPages;
// //       lastButton.dataset.goToPage = totalPages;
// //     }
// //   } else if (currentPage >= totalPages - 2 && totalPages >= 7) {
// //     lastButton.textContent = totalPages;
// //     lastButton.dataset.goToPage = totalPages;

// //     for (let i = 2; i <= 2 + (totalPages - currentPage); i++) {
// //       const selectedButton = document.querySelector(`.pagination-button-${i}`);
// //       selectedButton.classList.add('hidden');
// //     }

// //     currentButton = document.querySelector(
// //       `.pagination-button-${
// //         Math.min(7, totalPages) - (totalPages - currentPage)
// //       }`
// //     );
// //     currentButton.classList.add('active');

// //     for (let i = 2; i <= 6; i++) {
// //       const selectedButton = document.querySelector(`.pagination-button-${i}`);
// //       selectedButton.textContent = totalPages - 7 + i;
// //       selectedButton.dataset.goToPage = totalPages - 7 + i;
// //     }
// //   }

// //   if (currentPage > 4 && currentPage < totalPages - 2) {
// //     lastButton.textContent = totalPages;
// //     lastButton.dataset.goToPage = totalPages;
// //     for (let i = 2; i <= 6; i++) {
// //       const selectedButton = document.querySelector(`.pagination-button-${i}`);
// //       selectedButton.textContent = currentPage + (i - 4);
// //       selectedButton.dataset.goToPage = currentPage + (i - 4);
// //       //   console.log(
// //       //     'condition chech',
// //       //     i,
// //       //     currentPage,
// //       //     currentPage === currentPage + (i - 4)
// //       //   );
// //       if (currentPage === currentPage + (i - 4)) {
// //         selectedButton.classList.add('active');
// //       }
// //     }
// //   }
// // }

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
  if (currentPage >= totalPages - 3 || totalPages < 7) {
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

  if (source === 'trending') {
    pagination.addEventListener('click', pageSelectorClickHandler);
  } else if (source === 'searched') {
    pagination.addEventListener('click', pageSelectorClickHandler);
  }
}

export function pageSelectorClickHandler(e) {
  const target = e.target;
  if (target.classList.contains('pagination-button'))
    getAndDisplayTrendingMovies(Number(target.dataset.goToPage));
}
