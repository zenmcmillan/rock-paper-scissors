// query selectors

var classicButton = document.querySelector('.classic-button');
var classicAndHardContainers = document.querySelector('.classic-and-hard');
var hardButton = document.querySelector('.hard-button');
var changeGameButton = document.querySelector('.change-game-button');
var subtitle = document.querySelector('.subtitle');

// global variables

var players = []

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

window.addEventListener('load', function() {
  playersData() //data model

});

// event handlers

function playersData() {
 var you = createPlayer('You', '🙂');
 var computer = createPlayer('Computer', '💻');
 players.push(you, computer)
 console.log(players)
}

function createPlayer(personOrComputer, token) {
  return {name: personOrComputer, token: token,  wins: 0}
}

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

