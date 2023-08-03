// query selectors

var classicButton = document.querySelector('.classic-button');
var classicAndHardContainers = document.querySelector('.classic-and-hard');
var hardButton = document.querySelector('.hard-button');
var changeGameButton = document.querySelector('.change-game-button');
var subtitle = document.querySelector('.subtitle');
var personalGameInfo = document.querySelector('.personal-game-info');
var computerGameInfo = document.querySelector('.computer-game-info');

// global variables

var game = {}

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
  createGame() //data model
  renderPlayerData() //DOM
  classicFunctionality(game)
  computerTakingItsTurn()
});

// event handlers

function classicFunctionality(game) {
  var player1 = game.player1.chosenPiece
  var player2 = game.player2.chosenPiece
  player1 = 'rock'
  player2 = 'scissors'
  
   if (player1 === 'rock' && player2 === 'scissors') {
    game.player1.wins += 1
    game.player1.winThisRound = true
   }
   else if (player2 === 'rock' && player1 === 'scissors') {
     game.player2.wins += 1
     game.player2.winThisRound = true
   }
   else if (player1 === 'rock' && player2 === 'rock') {
     game.draw = true
   }
   else if (player1 === 'scissors' && player2 === 'paper') {
     game.player1.wins += 1
     game.player1.winThisRound = true
   }
   else if (player2 === 'scissors' && player1 === 'paper') {
     game.player2.wins += 1
     game.player2.winThisRound = true
  }
  else if (player1 === 'scissors' && player2 === 'scissors') {
     game.draw = true
  }
  else if (player1 === 'paper' && player2 === 'rock') {
     game.player1.wins += 1
     game.player1.winThisRound = true
   }
   else if (player2 === 'paper' && player1 === 'rock') {
     game.player2.wins += 1
     game.player2.winThisRound = true
  }
  else if (player1 === 'paper' && player2 === 'paper') {
    game.draw = true
  }
}

function computerTakingItsTurn() {
  var index = Math.floor(Math.random() * game.classicGameBoard.length);
  var piece = game.classicGameBoard[index]
  
  return console.log(piece)
}

function renderPlayerData() {
  
  personalGameInfo.innerHTML = '';

  personalGameInfo.innerHTML += 
  `<p class="icons">${game.player1.token}</p>
   <p class="player">${game.player1.name}</p>
   <p> Wins:<span> ${game.player1.wins}</span></p>`

   computerGameInfo.innerHTML = '';

   computerGameInfo.innerHTML += 
   `<p class="icons">${game.player2.token}</p>
   <p class="player">${game.player2.name}</p>
   <p> Wins:<span> ${game.player2.wins}</span></p>`
};

function createGame() {
 var player1 = createPlayer('You', '🙂');
 var player2 = createPlayer('Computer', '💻');
 game = {player1, player2, classicGameBoard: ['rock', 'paper', 'scissors'], 
  hardGameBoard: ['rock', 'paper', 'scissors', 'alien', 'lizard'], draw: false}
 console.log(game)
}

function createPlayer(personOrComputer, token) {
  return {name: personOrComputer, token: token,  wins: 0, winThisRound: false, chosenPiece: null}
};

function goToGame() {
  classicAndHardContainers.classList.add('hidden');
  changeGameButton.classList.remove('hidden');
  subtitle.innerText = 'Choose your fighter!';
};

function goBackToHomePage() {
  classicAndHardContainers.classList.remove('hidden');
  changeGameButton.classList.add('hidden');
  subtitle.innerText = 'Choose your game!';
};

