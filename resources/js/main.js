function initiateDynamicComponents() {

  function initiatePartModal() {
    const partCards = document.querySelectorAll('.part-card');
    const partModal = document.querySelector('#part-modal');

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
  }

  function initiateStoveTypes() {
    const stoveContainer = document.querySelector('.stove-type-container');
    const stoveTypes = Array.from(stoveContainer.children)[0];
    const stoveTypesArray = Array.from(stoveContainer.children[0].children);

    const dotsContainer = document.querySelector('.circle-dots-container');

    const nextBtn = document.querySelector('#btn-right');
    const prevBtn = document.querySelector('#btn-left');

    function moveToNewStove(currentStove, targetStove) {
      currentStove.classList.remove('active');
      targetStove.classList.add('active');
    }

    function updateDots(currentDot, targetDot) {
      currentDot.classList.remove('active');
      targetDot.classList.add('active');
    }

    function greyOutArrows(targetIndex) {
      if (targetIndex === 0) {
        prevBtn.classList.add('is-greyed-out')
        nextBtn.classList.remove('is-greyed-out');
      } else if (targetIndex === stoveTypesArray.length-1) {
        prevBtn.classList.remove('is-greyed-out');
        nextBtn.classList.add('is-greyed-out');
      } else {
        nextBtn.classList.remove('is-greyed-out');
        prevBtn.classList.remove('is-greyed-out');
      }
    }

    nextBtn.addEventListener('click', (e) => {
      const currentStove = stoveTypes.querySelector('.active');
      const nextStove = currentStove.nextElementSibling;
      const targetIndex = stoveTypesArray.findIndex( stove => stove === nextStove );
      // console.log(targetIndex);

      if(!nextStove) return;

      moveToNewStove(currentStove, nextStove);

      let currentDot = dotsContainer.querySelector('.active');
      let nextDot = currentDot.nextElementSibling;

      updateDots(currentDot, nextDot);
      greyOutArrows(targetIndex);

    });

    prevBtn.addEventListener('click', (e) => {
      const currentStove = stoveTypes.querySelector('.active');
      const prevStove = currentStove.previousElementSibling;
      const targetIndex = stoveTypesArray.findIndex( stove => stove === prevStove );

      if(!prevStove) return;

      moveToNewStove(currentStove, prevStove);

      let currentDot = dotsContainer.querySelector('.active');
      let prevDot = currentDot.previousElementSibling;

      updateDots(currentDot, prevDot);
      greyOutArrows(targetIndex);
    });

  }

  initiatePartModal();
  initiateStoveTypes();
}



initiateDynamicComponents();