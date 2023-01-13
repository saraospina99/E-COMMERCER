const toggleMenuElement = document.querySelector('#toggle-menu');
const mainMenuElement = document.querySelector('#main-menu');

toggleMenuElement.addEventListener('click', () => {
    mainMenuElement.classList.toggle('main-menu--show');
});