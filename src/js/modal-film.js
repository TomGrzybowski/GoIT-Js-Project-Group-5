export function addModal(listItem) {
  openModal(listItem);
  closeModal();
}
const modal = document.querySelector('[data-modal]');

const openModal = listItem => {
  listItem.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
};

const closeModal = () => {
  document
    .querySelector('.modal-film__close-btn')
    .addEventListener('click', () => {
      modal.classList.add('hidden');
    });

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.classList.add('hidden');
    }
  };
};

//end of modal opening and closing
