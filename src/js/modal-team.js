(() => {
    const refs = {
      openModal: document.querySelector('[data-team-modal-open]'),
      closeModal: document.querySelector('[data-team-modal-close]'),
      modal: document.querySelector('[data-team-modal]'),
    };
  
    refs.openModal.addEventListener('click', toggleModal);
    refs.closeModal.addEventListener('click', toggleModal);
  
    function toggleModal() {
      refs.modal.classList.toggle('is-hidden');
    }
  })();