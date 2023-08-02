// query selectors

var classicButton = document.querySelector('.classic-button');
var classicAndHardContainers = document.querySelector('.classic-and-hard');
var hardButton = document.querySelector('.hard-button');
var changeGameButton = document.querySelector('.change-game-button');
var subtitle = document.querySelector('.subtitle');
var personalGameInfo = document.querySelector('.personal-game-info');
var computerGameInfo = document.querySelector('.computer-game-info');


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
  createPlayersData() //data model
  renderPlayerData() //DOM
  renderComputerPlayingData() //DOM
});

// event handlers

function renderPlayerData() {
  
  personalGameInfo.innerHTML = '';

  personalGameInfo.innerHTML += 
  `<p class="icons">${players[0].token}</p>
   <p class="player">${players[0].name}</p>
   <p> Wins:<span> ${players[0].wins}</span></p>`
}

function renderComputerPlayingData() {
  
  computerGameInfo.innerHTML = '';

  computerGameInfo.innerHTML += 
  `<p class="icons">${players[1].token}</p>
  <p class="player">${players[1].name}</p>
  <p> Wins:<span> ${players[1].wins}</span></p>`
}


function createPlayersData() {
 var you = createPlayer('You', '🙂');
 var computer = createPlayer('Computer', '💻');
 players.push(you, computer)
 console.log(players)
}

function createPlayer(personOrComputer, token) {
  return {name: personOrComputer, token: token,  wins: 1}
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

