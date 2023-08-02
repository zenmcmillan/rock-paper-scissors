// query selectors

var classicButton = document.querySelector('.classic-button');
var classicAndHardContainers = document.querySelector('.classic-and-hard');
var hardButton = document.querySelector('.hard-button');
// event listeners

classicButton.addEventListener('click', function() {
  goToGame();
});

hardButton.addEventListener('click',function() {
  goToGame();
});

// event handlers

function goToGame() {
  classicAndHardContainers.classList.add('hidden');
};
