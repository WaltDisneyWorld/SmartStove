window.onload = () => {
  let partCards = document.querySelectorAll('.part-card');
  let partModal = document.querySelector('#part-modal');

  for (let card of partCards) {
    card.addEventListener('click', () => {
      partModal.style.display = 'block';
    });
  }

  document.body.addEventListener('click', (e) => {
    if(e.target == partModal) {
      partModal.style.animation = 'fadeOut 0.5s';
      setTimeout(()=> {
        partModal.style.display = 'none';
        partModal.style.animation = 'fadeIn 1s';
      }, 400);
    }
  });
};