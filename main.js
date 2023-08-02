// query selectors

var classicButton = document.querySelector('.classic-button');
var classicAndHardContainers = document.querySelector('.classic-and-hard');
var hardButton = document.querySelector('.hard-button');
var changeGameButton = document.querySelector('.change-game-button');
var subtitle = document.querySelector('.subtitle');
var personalGameInfo = document.querySelector('.personal-game-info');
var computerGameInfo = document.querySelector('.computer-game-info');


// global variables

var players = {}
var classicGameBoard = ['rock', 'paper', 'scissors']

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
  createPlayersData() //data model
  renderPlayersData() //DOM
});

// event handlers

function renderPlayersData() {
  
  personalGameInfo.innerHTML = '';

  personalGameInfo.innerHTML += 
  `<p class="icons">${players.player1.token}</p>
   <p class="player">${players.player1.name}</p>
   <p> Wins:<span> ${players.player1.wins}</span></p>`

   computerGameInfo.innerHTML = '';

   computerGameInfo.innerHTML += 
   `<p class="icons">${players.player2.token}</p>
   <p class="player">${players.player2.name}</p>
   <p> Wins:<span> ${players.player2.wins}</span></p>`
};

function createPlayersData() {
 var player1 = createPlayer('You', '🙂');
 var player2 = createPlayer('Computer', '💻');
 players = {player1, player2}
 console.log(players)
}

function createPlayer(personOrComputer, token) {
  return {name: personOrComputer, token: token,  wins: 1, chosenPiece: null}
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

