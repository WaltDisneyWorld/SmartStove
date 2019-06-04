function initiateDynamicComponents() {

  function addEventListenersForPartModal() {
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

  function addEventListenersForStoveTypes() {
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

  function addEventListenersForHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.main-nav-container');

    function showMenu() {
      hamburger.querySelector('i').classList.remove('ion-navicon');
      hamburger.querySelector('i').classList.add('ion-ios-close-empty');

      navMenu.style.visibility = 'visible';
      navMenu.style.opacity = '1';

      hamburger.removeEventListener('click', showMenu);
      hamburger.addEventListener('click', hideMenu);
    }

    function hideMenu() {
      navMenu.style.opacity = '0';
      setTimeout(()=> {
        navMenu.style.visibility = 'hidden';
      }, 500);
      hamburger.querySelector('i').classList.remove('ion-ios-close-empty');
      hamburger.querySelector('i').classList.add('ion-navicon');

      hamburger.removeEventListener('click', hideMenu);
      hamburger.addEventListener('click', showMenu);
    }

    hamburger.addEventListener('click', showMenu);
  }

  addEventListenersForPartModal();
  addEventListenersForStoveTypes();
  addEventListenersForHamburgerMenu();
}

window.onload = () => {
  initiateDynamicComponents();
};