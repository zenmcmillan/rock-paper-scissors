// query selectors

var classicButton = document.querySelector('.classic-button');
var classicAndHardContainers = document.querySelector('.classic-and-hard');
var hardButton = document.querySelector('.hard-button');
var changeGameButton = document.querySelector('.change-game-button');
var subtitle = document.querySelector('.subtitle');
var personalGameInfo = document.querySelector('.personal-game-info');
var computerGameInfo = document.querySelector('.computer-game-info');
var classicGameBoardContainer = document.querySelector('.classic-gameboard-container');
var harderPiecesGameboardContainer = document.querySelector('.harder-pieces-gameboard');
var allGamePiecesContainer = document.querySelector('.all-game-pieces-container');
var computerGameInfo = document.querySelector('.computer-game-info');

// global variables

var game = {};
var playersClickedPiece;
var computersChosenPiece;

// event listeners

window.addEventListener('load', function() {
  createGame() //data model
  renderPlayerData() //DOM
  hideGameOnPageLoad()
});

classicButton.addEventListener('click', function() {
  goToClassicGame();
});

hardButton.addEventListener('click',function() {
  goToHardGame();
 // computerTakingItsTurn(game, ['hardGameBoard']); 
});

changeGameButton.addEventListener('click', function() {
 goBackToHomePage()
});

allGamePiecesContainer.addEventListener('click', function(event) {
  if (harderPiecesGameboardContainer.classList.contains('hidden')) {
    makeGameFunctional(event, ['classicGameBoard'])
  } else {
    makeGameFunctional(event, ['hardGameBoard'])
  } 
  showWhoWonTheRound()
  renderPlayerData()
 });

// event handlers

function adjustBoardContainer() {
 allGamePiecesContainer 
}

function makeGameFunctional(event, [gameArray]) {
  playerClicksPiece(event)
  computerTakingItsTurn(game, [gameArray])
  createGameFunctionality(game, playersClickedPiece, computersChosenPiece)
}

function showWhoWonTheRound() {
  if (game.player1.wonThisRound) {
    subtitle.innerText = 'You won this round! 🙂'
  }
  else if(game.player2.wonThisRound) {
    subtitle.innerText = 'Computer won this round! 💻'
  }
  else subtitle.innerText = 'This Round is a draw!'
}  

function updateComputerWins() {

  computerGameInfo.innerHTML = '';

  computerGameInfo.innerHTML += `
  <section class="track-score computer-game-info">
  <p class="icons">💻</p>
  <p class="player">Computer</p>
  <p>Wins:<span> ${game.player2.wins}</span></p>
</section>`
}

function playerClicksPiece(event) {
    playersClickedPiece = event.target.id
   game.player1.chosenPiece = playersClickedPiece
   return console.log("player:", playersClickedPiece)
};

function computerTakingItsTurn(game, [array]) {
  var gameChoice = game[array]
   computersChosenPiece = gameChoice[getRandomIndex(gameChoice)]
  game.player2.chosenPiece = computersChosenPiece
  return console.log("computer:", game.player2.chosenPiece)
 };
 
 function getRandomIndex(array) {
   return Math.floor(Math.random() * array.length)
 };

function createGameFunctionality(game, playerPiece, computerPiece) {

    game.player1.chosenPiece = playerPiece
    game.player2.chosenPiece = computerPiece
  
    if (game.player1.chosenPiece === 'rock' && game.player2.chosenPiece === 'scissors') { 
    game.player1.wins += 1
    game.player1.wonThisRound = true 
    game.player2.wonThisRound = false
    game.draw = false
   }
   else if (game.player2.chosenPiece === 'rock' && game.player1.chosenPiece === 'scissors') {
     game.player2.wins += 1
     game.player2.wonThisRound = true
     game.player1.wonThisRound = false
     game.draw = false
   }
   else if (game.player1.chosenPiece === 'rock' && game.player2.chosenPiece === 'rock') {
     game.player1.wonThisRound = false
     game.player2.wonThisRound = false
     game.draw = true
   }
   else if (game.player1.chosenPiece === 'scissors' && game.player2.chosenPiece === 'paper') {
     game.player1.wins += 1
     game.player1.wonThisRound = true
     game.player2.wonThisRound = false
     game.draw = false
   }
   else if (game.player2.chosenPiece === 'scissors' && game.player1.chosenPiece === 'paper') {
     game.player2.wins += 1
     game.player2.wonThisRound = true
     game.player1.wonThisRound = false
     game.draw = false
  }
  else if (game.player1.chosenPiece === 'scissors' && game.player2.chosenPiece === 'lizard') {
    game.player1.wins += 1
     game.player1.wonThisRound = true
     game.player2.wonThisRound = false
     game.draw = false
  } 
  else if (game.player2.chosenPiece === 'scissors' && game.player2.chosenPiece === 'lizard') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
 } 
  else if (game.player1.chosenPiece === 'scissors' && game.player2.chosenPiece === 'scissors') {
    game.player1.wonThisRound = false
    game.player2.wonThisRound = false
    game.draw = true
  }
  else if (game.player2.chosenPiece === 'lizard' && game.player2.chosenPiece === 'scissors') {
    game.player2.wonThisRound = false
    game.player1.wonThisRound = false
    game.draw = true
 }
  else if (game.player1.chosenPiece === 'paper' && game.player2.chosenPiece === 'rock') {
     game.player1.wins += 1
     game.player1.wonThisRound = true
     game.player2.wonThisRound = false
     game.draw = false
   }
   else if (game.player2.chosenPiece === 'paper' && game.player1.chosenPiece === 'rock') {
     game.player2.wins += 1
     game.player2.wonThisRound = true
     game.player1.wonThisRound = false
     game.draw = false
  }
  else if (game.player1.chosenPiece === 'paper' && game.player2.chosenPiece === 'paper') {
    game.player1.wonThisRound = false
    game.player2.wonThisRound = false
    game.draw = true
  }
  else if (game.player1.chosenPiece === 'lizard' && game.player2.chosenPiece === 'paper') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  }
  else if (game.player2.chosenPiece === 'lizard' && game.player1.chosenPiece === 'paper') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  }
  else if (game.player1.chosenPiece === 'lizard' && game.player2.chosenPiece === 'lizard') {
    game.player1.wonThisRound = false
    game.player2.wonThisRound = false
    game.draw = true
  }
  else if (game.player1.chosenPiece === 'alien' && game.player2.chosenPiece === 'scissors') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  }
  else if (game.player2.chosenPiece === 'alien' && game.player1.chosenPiece === 'scissors') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  } 

  else if (game.player1.chosenPiece === 'alien' && game.player2.chosenPiece === 'alien') {
    game.player1.wonThisRound = false
    game.player2.wonThisRound = false
    game.draw = true
  } 
  else if (game.player1.chosenPiece === 'alien' && game.player2.chosenPiece === 'rock') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  }  
  else if (game.player2.chosenPiece === 'alien' && game.player1.chosenPiece === 'rock') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  } 
  else if (game.player1.chosenPiece === 'rock' && game.player2.chosenPiece === 'lizard') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  } else if (game.player2.chosenPiece === 'rock' && game.player1.chosenPiece === 'lizard') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  } 
  else if (game.player1.chosenPiece === 'paper' && game.player2.chosenPiece === 'alien') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  } 
  else if (game.player2.chosenPiece === 'paper' && game.player1.chosenPiece === 'alien') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  }
   else if (game.player1.chosenPiece === 'scissors' && game.player2.chosenPiece === 'lizard') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  } 
  else if (game.player2.chosenPiece === 'scissors' && game.player1.chosenPiece === 'lizard') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  }
  else if (game.player1.chosenPiece === 'lizard' && game.player2.chosenPiece === 'alien') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  } 
  else if (game.player2.chosenPiece === 'lizard' && game.player1.chosenPiece === 'alien') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  } 
  console.log(game.player1);
  console.log(game.player2);
};

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

function hideGameOnPageLoad() {
  classicGameBoardContainer.classList.add('hidden')
  harderPiecesGameboardContainer.classList.add('hidden')
}

function goToClassicGame() {
  classicAndHardContainers.classList.add('hidden');
  changeGameButton.classList.remove('hidden');
  classicGameBoardContainer.classList.remove('hidden');
  subtitle.innerText = 'Choose your fighter!';
};

function goToHardGame() {
  goToClassicGame()
  harderPiecesGameboardContainer.classList.remove('hidden'); 
}

function goBackToHomePage() {
  classicAndHardContainers.classList.remove('hidden');
  changeGameButton.classList.add('hidden');
  classicGameBoardContainer.classList.add('hidden');
  harderPiecesGameboardContainer.classList.add('hidden')
  subtitle.innerText = 'Choose your game!';
};

