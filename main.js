// query selectors

var classicButton = document.querySelector('.classic-button');
var classicAndHardContainers = document.querySelector('.classic-and-hard');
var hardButton = document.querySelector('.hard-button');
var changeGameButton = document.querySelector('.change-game-button');
var subtitle = document.querySelector('.subtitle');

// event listeners

classicButton.addEventListener('click', function() {
  goToGame();
});

hardButton.addEventListener('click',function() {
  goToGame();
});

changeGameButton.addEventListener('click', function() {
 goBackToHomePage()
});

// event handlers

function goToGame() {
  classicAndHardContainers.classList.add('hidden');
  changeGameButton.classList.remove('hidden')
  subtitle.innerText = 'Choose your fighter!'
};

function goBackToHomePage() {
  classicAndHardContainers.classList.remove('hidden');
  changeGameButton.classList.add('hidden');
  subtitle.innerText = 'Choose your game!'
};