// query selectors

var classicButton = document.querySelector('.classic-button');
var classicAndHardContainers = document.querySelector('.classic-and-hard');

// event listeners

classicButton.addEventListener('click', function () {
  goToClassicGame();
  console.log("testing 1")
});

// event handlers

function goToClassicGame() {
  classicAndHardContainers.classList.add('hidden');
}

