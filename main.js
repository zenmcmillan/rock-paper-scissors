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
 // createGameFunctionality(game, 'rock', 'scissors')
   computerTakingItsTurn(game, ['classicGameBoard']);
});

hardButton.addEventListener('click',function() {
  goToGame();
  computerTakingItsTurn(game, ['hardGameBoard']);
  
});

changeGameButton.addEventListener('click', function() {
 goBackToHomePage()
});

window.addEventListener('load', function() {
  createGame() //data model
  renderPlayerData() //DOM
 
});

// event handlers

function computerTakingItsTurn(game, [array]) {
  var gameChoice = game[array]
  var piece = gameChoice[getRandomIndex(gameChoice)]
  game.player2.chosenPiece = piece
  createGameFunctionality(game,'rock', piece) // rock here is temporary. I need to figure out a way to capture the value probably the name when the rock paper or scissors is clicked. 
  return console.log(game.player2.chosenPiece)

 }
 
 function getRandomIndex(array) {
   return Math.floor(Math.random() * array.length)
 }

function createGameFunctionality(game, playerPiece, computerPiece) {

    game.player1.chosenPiece = playerPiece
    game.player2.chosenPiece = computerPiece
  
    if (game.player1.chosenPiece === 'rock' && game.player2.chosenPiece === 'scissors' || game.player2.chosenPiece === 'lizard') { 
    game.player1.wins += 1
    game.player1.wonThisRound = true 
   }
   else if (game.player2.chosenPiece === 'rock' && game.player1.chosenPiece === 'scissors' || game.player1.chosenPiece === 'lizard') {
     game.player2.wins += 1
     game.player2.wonThisRound = true
   }
   else if (game.player1.chosenPiece === 'rock' && game.player2.chosenPiece === 'rock') {
     game.draw = true
   }
   else if (game.player1.chosenPiece === 'scissors' && game.player2.chosenPiece === 'paper' || game.player2.chosenPiece === 'lizard') {
     game.player1.wins += 1
     game.player1.wonThisRound = true
   }
   else if (game.player2.chosenPiece === 'scissors' && game.player1.chosenPiece === 'paper' || game.player1.chosenPiece === 'lizard') {
     game.player2.wins += 1
     game.player2.wonThisRound = true
  }
  else if (game.player1.chosenPiece === 'scissors' && game.player2.chosenPiece === 'scissors') {
     game.draw = true
  }
  else if (game.player1.chosenPiece === 'paper' && game.player2.chosenPiece === 'rock' || game.player2.chosenPiece === 'alien') {
     game.player1.wins += 1
     game.player1.wonThisRound = true
   }
   else if (game.player2.chosenPiece === 'paper' && game.player1.chosenPiece === 'rock' || game.player1.chosenPiece === 'alien') {
     game.player2.wins += 1
     game.player2.wonThisRound = true
  }
  else if (game.player1.chosenPiece === 'paper' && game.player2.chosenPiece === 'paper') {
    game.draw = true
  }
  else if (game.player1.chosenPiece === 'lizard' && game.player2.chosenPiece === 'paper' || game.player2.chosenPiece === 'alien') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
  }
  else if (game.player2.chosenPiece === 'lizard' && game.player1.chosenPiece === 'paper' || game.player1.chosenPiece === 'alien') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
  }
  else if (game.player1.chosenPiece === 'alien' && game.player2.chosenPiece === 'scissors' || game.player2.chosenPiece === 'rock') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
  }
  else if (game.player2.chosenPiece === 'alien' && game.player1.chosenPiece === 'scissors' || game.player1.chosenPiece === 'rock') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
  }
  console.log(game.player1);
  console.log(game.player2);
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
  return {name: personOrComputer, token: token,  wins: 0, wonThisRound: false, chosenPiece: 'piece'}
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

