function initiateDynamicComponents() {

  function addEventListenersForModals() {

    // Common functions for all modal
    function openModal(modal) {
      modal.style.display = 'block';
    }

    function closeModal(modal) {
      modal.style.animation = 'fadeOut 0.5s';
      setTimeout(()=> {
        modal.style.display = 'none';
        modal.style.animation = 'fadeIn 1s';
      }, 400);
    }

    function closeModalOnBackgroundClick(modal) {
      document.body.addEventListener('click', (e) => {
        if(e.target == modal) {
          closeModal(modal);
        }
      });
    }

    // each one for specific modal
    function forPartsModal() {
      const partCards = document.querySelectorAll('.part-card');
      const partModal = document.querySelector('#part-modal');
      const closeBtn = document.querySelector('#part-modal-close-btn');

      for (let card of partCards) {
        card.addEventListener('click', () => openModal(partModal) );
      }

      closeBtn.addEventListener('click', () => closeModal(partModal));

      document.body.addEventListener('click', () => closeModalOnBackgroundClick(partModal) );
    }

    function forContactModal() {
      const contactBtn = document.querySelector('#contact-modal-btn');
      const contactModal = document.querySelector('#contact-modal');
      const closeBtn = document.querySelector('#contact-modal-close-btn');

      contactBtn.addEventListener('click', () => openModal(contactModal));
      closeBtn.addEventListener('click', () => closeModal(contactModal));

      document.body.addEventListener('click', () => closeModalOnBackgroundClick(contactModal) );
    }

    forPartsModal();
    forContactModal();

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

  function addEventListenersForServiceNav() {
    const leftBtn = document.querySelector('#service-left');
    const rightBtn = document.querySelector('#service-right');

    const firstServiceBox = document.querySelector('.service-track').children[0];

    leftBtn.addEventListener('click', () => {
      const firstServiceBox = document.querySelector('.service-track').children[0];
      const matrix = new WebKitCSSMatrix(window.getComputedStyle(firstServiceBox).webkitTransform);
      const amountToMove = matrix.m41 - 180;

      const serviceBoxesArray = Array.from(document.querySelector('.service-track').children);
      for(box of serviceBoxesArray) {
        box.style.transform = 'translateX('+ amountToMove +'px)';
      }
    });

    rightBtn.addEventListener('click', () => {
      const firstServiceBox = document.querySelector('.service-track').children[0];
      const matrix = new WebKitCSSMatrix(window.getComputedStyle(firstServiceBox).webkitTransform);
      const amountToMove = matrix.m41 + 180;

      const serviceBoxesArray = Array.from(document.querySelector('.service-track').children);
      for(box of serviceBoxesArray) {
        box.style.transform = 'translateX('+ amountToMove +'px)';
      }
    });

  }

  addEventListenersForModals();
  addEventListenersForStoveTypes();
  addEventListenersForHamburgerMenu();
  addEventListenersForServiceNav();
}

window.onload = () => {
  initiateDynamicComponents();
};