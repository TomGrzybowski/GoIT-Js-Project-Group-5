import createMovieCard from './createCards.js';
const ACTIVE_SECTION_CLASS = 'active';
const HIDDEN_SECTION_CLASS = 'hidden';
const WATCHED_SECTION_ID = '#watched-btn';
const QUEUE_SECTION_ID = '#queue-btn';
const LOCAL_STORAGE_WATCHED_KEY = 'Watched';
const LOCAL_STORAGE_QUEUE_KEY = 'Queue';
const sectionButtons = document.querySelectorAll('.button-library');
const initialButton = document.getElementById(WATCHED_SECTION_ID);
const sectionContainer = document.querySelector('.movies');

//Zmiana aktywngo buttona
function markActiveButton(button) {
  sectionButtons.forEach(button =>
    button.classList.remove(ACTIVE_SECTION_CLASS)
  );
  button.classList.add(ACTIVE_SECTION_CLASS);
}

//Po kliknięciu - zmiana aktywngo buttona i wypełnienie sekcji
function initListeners() {
  sectionButtons.forEach(button =>
    button.addEventListener('click', e => {
      const isActiveButton = e.target.classList.contains('active');
      if (!isActiveButton) {
        markActiveButton(e.target);
        populateSection(e.target);
      }
    })
  );
}

//Wypełnienie sekcji danymi pobranymi z local-storage w zależności czy kliknięto button "watched" czy "queued"
function populateSection(target) {
  // sectionContainer.classList.add(HIDDEN_SECTION_CLASS);
  const timeout = setTimeout(() => {
    sectionContainer.innerHTML = '';
    const selectedSectionId = target.getAttribute('id') ?? WATCHED_SECTION_ID;
    const elements = JSON.parse(readSectionFromLocalStorage(selectedSectionId));
    if (elements.length > 0) {
      elements.forEach(movieData => createMovieCard(movieData));
    } else {
      renderEmptyState();
    }
    sectionContainer.classList.remove(HIDDEN_SECTION_CLASS);
    clearTimeout(timeout);
  }, 300);
}

//Renderowane gdy nie ma nic dodanego do "watched"/"queued"
function renderEmptyState() {
  const markup = `
    <div>
    <p><strong>Please add elements to the list </strong></p>
    </div>
    `;
  sectionContainer.innerHTML = markup;
  sectionContainer.classList.remove(HIDDEN_SECTION_CLASS);
}

//"Czyste" odczytywanie z local-storage
function readElementsFromLocalStorage(key) {
  return localStorage.getItem(key);
}

//Odczytywanie z local-storage "watched" lub "queued"
function readSectionFromLocalStorage(sectionName) {
  let elements;
  switch (sectionName) {
    case WATCHED_SECTION_ID:
      elements = readElementsFromLocalStorage(LOCAL_STORAGE_WATCHED_KEY);
      break;
    case QUEUE_SECTION_ID:
      elements = readElementsFromLocalStorage(LOCAL_STORAGE_QUEUE_KEY);
      break;
    default:
      throw new Error('Not implemented sectionName: ' + sectionName);
  }
  return elements;
}

function initScripts() {
  initialButton.classList.add(ACTIVE_SECTION_CLASS);
  markActiveButton(initialButton);
  initListeners();
  populateSection();
}

if (sectionButtons.length > 0) {
  initScripts();
}
