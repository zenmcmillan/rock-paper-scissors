// query selectors

var classicButton = document.querySelector('.classic-button');
var classicAndHardContainers = document.querySelector('.classic-and-hard');
var hardButton = document.querySelector('.hard-button');
var changeGameButton = document.querySelector('.change-game-button');
var subtitle = document.querySelector('.subtitle');
var personalGameInfo = document.querySelector('.personal-game-info');
var computerGameInfo = document.querySelector('.computer-game-info');
var allGamePiecesContainer = document.querySelector('.all-game-pieces-container');
var computerGameInfo = document.querySelector('.computer-game-info');
var piecesContainer = document.querySelectorAll('.pieces-container');
var gamePieces = document.querySelectorAll('.game-piece');

// global variables

var game = {};
var playersClickedPiece;
var computersChosenPiece;

// event listeners

window.addEventListener('load', function() {
  createGame() 
  renderPlayerData() 
  hideGameOnPageLoad()
});

classicButton.addEventListener('click', function() {
  goToClassicGame();
  renderClassicGamePieces()
  createPlayerChosenPiece()

});

hardButton.addEventListener('click',function() {
  goToHardGame();
  renderHardGamePieces()
  createPlayerChosenPiece()
});

changeGameButton.addEventListener('click', function() {
  goBackToHomePage()
  returnGamePiecesClick()
});

allGamePiecesContainer.addEventListener('click', function(event) {
  if (game.classicOrHard === 'classic') {
    renderPlayerData()
    playerClicksPiece(event)
    createComputerchosenPiece()
    computerTakingItsTurn(game,['classicGameBoard'])
    plugInPieces()
    showEmoji()
    disableGamePieces()
    setTimeout(showChosenPieces, 1000)
    setTimeout(showWhoWonTheRound, 1000)
    setTimeout(renderPlayerData, 2500)
    setTimeout(renderClassicGamePieces, 2500)
    setTimeout(returnGamePiecesClick, 2500)
  } else {
    renderPlayerData()
    playerClicksPiece(event)
    createComputerchosenPiece()
    computerTakingItsTurn(game,['hardGameBoard'])
    plugInPieces()
    showEmoji()
    disableGamePieces()
    setTimeout(showChosenPieces, 1000)
    setTimeout(showWhoWonTheRound, 1000)
    setTimeout(renderPlayerData, 2500)
    setTimeout(renderHardGamePieces, 2500)
    setTimeout(returnGamePiecesClick, 2500)
  } 
 });

// event handlers

function showChosenPieces() {

  allGamePiecesContainer.innerHTML = ''

  allGamePiecesContainer.innerHTML += 

  `<div class="pieces-container">
      <img class="game-piece" src="${playersClickedPiece.image}">
  </div>
  <div class="pieces-container">
      <img class="game-piece" src="${computersChosenPiece.image}">
  </div>`
};


function showEmoji() {
    if (playersClickedPiece.name === 'rock') {
      document.querySelector('.rock').classList.remove('hidden');
    } else if (playersClickedPiece.name === 'paper') {
      document.querySelector('.paper').classList.remove('hidden');
    } else if (playersClickedPiece.name === 'scissors') {
      document.querySelector('.scissors').classList.remove('hidden');
    } else if (playersClickedPiece.name === 'lizard') {
      document.querySelector('.lizard').classList.remove('hidden');
    } else if (playersClickedPiece.name === 'alien') {
      document.querySelector('.alien').classList.remove('hidden');
    }
  };

function disableGamePieces() {
  allGamePiecesContainer.style.pointerEvents = 'none';
};

function returnGamePiecesClick() {
  allGamePiecesContainer.style.pointerEvents = 'auto';
};

function showWhoWonTheRound() {
  if (game.player1.wonThisRound) {
    subtitle.innerText = '🙂 You won this round! 🙂';
   } else if (game.player2.wonThisRound) {
    subtitle.innerText = '💻 Computer won this round! 💻';
   } else subtitle.innerText = 'This Round is a draw!';
 }; 

function playerClicksPiece(event) {
  playersClickedPiece.name = event.target.id;
  playersClickedPiece.image = game.allGamePieces[playersClickedPiece.name];
  game.player1.chosenPiece = playersClickedPiece;
};

function computerTakingItsTurn(game, [array]) {
  var gameChoice = game[array];
  computersChosenPiece.name = gameChoice[getRandomIndex(gameChoice)];
  computersChosenPiece.image = game.allGamePieces[computersChosenPiece.name];
  game.player2.chosenPiece = computersChosenPiece;
 };

function createComputerchosenPiece() {
  computersChosenPiece = {name: null, image: null};
};

function createPlayerChosenPiece() {
  playersClickedPiece = {name: null, image: null};
};

function getRandomIndex(array) {
   return Math.floor(Math.random() * array.length);
 };


function plugInPieces() {
 return createGameFunctionality(game, playersClickedPiece, computersChosenPiece);
}

function createGameFunctionality(game, playerPiece, computerPiece) {
  var playerPiece = playersClickedPiece.name;
  var  computerPiece = computersChosenPiece.name;
  
  if (playerPiece === 'rock' && computerPiece === 'scissors') { 
    game.player1.wins += 1;
    game.player1.wonThisRound = true;
    game.player2.wonThisRound = false;
    game.draw = false
   } else if (computerPiece === 'rock' &&  playerPiece === 'scissors') {
    game.player2.wins += 1;
    game.player2.wonThisRound = true;
    game.player1.wonThisRound = false;
    game.draw = false
   } else if (playerPiece === 'rock' && computerPiece === 'rock') {
    game.player1.wonThisRound = false;
    game.player2.wonThisRound = false;
    game.draw = true;
   } else if (playerPiece === 'paper' &&  computerPiece === 'rock') {
    game.player1.wins += 1;
    game.player1.wonThisRound = true;
    game.player2.wonThisRound = false;
    game.draw = false;
   } else if (computerPiece === 'paper' && playerPiece === 'rock') {
    game.player2.wins += 1;
    game.player2.wonThisRound = true;
    game.player1.wonThisRound = false;
    game.draw = false;
   } else if (playerPiece === 'scissors' && computerPiece === 'paper') {
     game.player1.wins += 1;
     game.player1.wonThisRound = true;
     game.player2.wonThisRound = false;
     game.draw = false;
   } else if (computerPiece === 'scissors' && playerPiece === 'paper') {
     game.player2.wins += 1;
     game.player2.wonThisRound = true;
     game.player1.wonThisRound = false;
     game.draw = false;
   } else if (playerPiece === 'scissors' && computerPiece === 'lizard') {
    game.player1.wins += 1;
     game.player1.wonThisRound = true;
     game.player2.wonThisRound = false;
     game.draw = false;
   } else if (computerPiece === 'scissors' && playerPiece === 'lizard') {
    game.player2.wins += 1;
    game.player2.wonThisRound = true;
    game.player1.wonThisRound = false;
    game.draw = false;
   } else if (playerPiece === 'scissors' && computerPiece === 'scissors') {
    game.player1.wonThisRound = false;
    game.player2.wonThisRound = false;
    game.draw = true;
   } else if (playerPiece === 'paper' && computerPiece === 'paper') {
    game.player1.wonThisRound = false;
    game.player2.wonThisRound = false;
    game.draw = true;
   } else if (playerPiece === 'lizard' && computerPiece === 'paper') {
    game.player1.wins += 1;
    game.player1.wonThisRound = true;
    game.player2.wonThisRound = false;
    game.draw = false;
   } else if (computerPiece === 'lizard' && playerPiece === 'paper') {
    game.player2.wins += 1;
    game.player2.wonThisRound = true;
    game.player1.wonThisRound = false;
    game.draw = false;
   } else if (playerPiece === 'lizard' && computerPiece === 'lizard') {
    game.player1.wonThisRound = false;
    game.player2.wonThisRound = false;
    game.draw = true;
   } else if (playerPiece === 'alien' && computerPiece === 'scissors') {
    game.player1.wins += 1;
    game.player1.wonThisRound = true;
    game.player2.wonThisRound = false;
    game.draw = false;
   } else if (computerPiece === 'alien' && playerPiece === 'scissors') {
    game.player2.wins += 1;
    game.player2.wonThisRound = true;
    game.player1.wonThisRound = false;
    game.draw = false;
   } else if (playerPiece === 'alien' && computerPiece === 'alien') {
    game.player1.wonThisRound = false;
    game.player2.wonThisRound = false;
    game.draw = true;
   } else if (playerPiece === 'alien' && computerPiece === 'rock') {
    game.player1.wins += 1;
    game.player1.wonThisRound = true;
    game.player2.wonThisRound = false;
    game.draw = false;
   } else if (computerPiece === 'alien' && playerPiece === 'rock') {
    game.player2.wins += 1;
    game.player2.wonThisRound = true;
    game.player1.wonThisRound = false;
    game.draw = false;
   } else if (playerPiece === 'alien' && computerPiece === 'paper') {
    game.player2.wins += 1;
    game.player2.wonThisRound = true;
    game.player1.wonThisRound = false;
    game.draw = false;
   } else if (playerPiece === 'paper' &&computerPiece === 'alien') {
    game.player1.wins += 1;
    game.player1.wonThisRound = true;
    game.player2.wonThisRound = false;
    game.draw = false;
   } else if (playerPiece === 'rock' && computerPiece === 'lizard') {
    game.player1.wins += 1;
    game.player1.wonThisRound = true;
    game.player2.wonThisRound = false;
    game.draw = false;
   } else if (computerPiece === 'rock' && playerPiece === 'lizard') {
   game.player2.wins += 1;
   game.player2.wonThisRound = true;
   game.player1.wonThisRound = false;
   game.draw = false;
   } else if (playerPiece === 'paper' && computerPiece === 'alien') {
   game.player1.wins += 1;
   game.player1.wonThisRound = true;
   game.player2.wonThisRound = false;
   game.draw = false;
   } 
  else if (playerPiece === 'paper' && computerPiece === 'alien') {
    game.player2.wins += 1;
    game.player2.wonThisRound = true;
    game.player1.wonThisRound = false;
    game.draw = false;
   } else if (playerPiece === 'scissors' && computerPiece === 'lizard') {
    game.player1.wins += 1;
    game.player1.wonThisRound = true;
    game.player2.wonThisRound = false;
    game.draw = false;
   } else if (computerPiece === 'scissors' && playerPiece === 'lizard') {
    game.player2.wins += 1;
    game.player2.wonThisRound = true;
    game.player1.wonThisRound = false;
    game.draw = false;
   } else if (playerPiece === 'lizard' && computerPiece === 'alien') {
    game.player1.wins += 1;
    game.player1.wonThisRound = true;
    game.player2.wonThisRound = false;
    game.draw = false;
   } else if (computerPiece === 'lizard' && playerPiece === 'alien') {
    game.player2.wins += 1;
    game.player2.wonThisRound = true;
    game.player1.wonThisRound = false;
    game.draw = false;
  } 
};

function renderPlayerData() {
  
  personalGameInfo.innerHTML = '';

  personalGameInfo.innerHTML += `
    <p class="icons">${game.player1.token}</p>
    <p class="player">${game.player1.name}</p>
    <p> Wins:<span> ${game.player1.wins}</span></p>`

   computerGameInfo.innerHTML = '';

   computerGameInfo.innerHTML += `
    <p class="icons">${game.player2.token}</p>
    <p class="player">${game.player2.name}</p>
    <p> Wins:<span> ${game.player2.wins}</span></p>`
};

function createGame() {
  var player1 = createPlayer('You', '🙂');
  var player2 = createPlayer('Computer', '💻');
  var theGamePieces = createGamePiecesImages(`./assets/happy-rocks.png`, `./assets/happy-paper.png`, `./assets/happy-scissors.png`,`./assets/lizard.png`,`./assets/happy-alien.png`,)
  game = {player1, player2, classicGameBoard: ['rock', 'paper', 'scissors'], 
  hardGameBoard: ['rock', 'paper', 'scissors', 'alien', 'lizard'], classicOrHard: null, draw: false, allGamePieces: theGamePieces}
};

function renderHardGamePieces() {

  subtitle.innerText = 'Choose your fighter!';

  allGamePiecesContainer.innerHTML = '';

  allGamePiecesContainer.innerHTML += `
    <div class="pieces-container">
      <img class="game-piece" alt="rock" id="rock" src="${game.allGamePieces.rock}">
  <div class="rock hidden">${game.player1.token}</div>
  </div>
  <div class="pieces-container">
      <img class="game-piece" alt="paper" id="paper" src="${game.allGamePieces.paper}">
      <div class="paper hidden">${game.player1.token}</div>
  </div>
  <div class="pieces-container">
      <img class="game-piece" alt="scissors" id="scissors" src="${game.allGamePieces.scissors}">
      <div class="scissors hidden">${game.player1.token}</div>
  </div>
  <div class="pieces-container">
     <img class="game-piece"  alt="lizard" id="lizard" src="${game.allGamePieces.lizard}">
     <div class="lizard hidden">${game.player1.token}</div>
  </div>
  <div class="pieces-container">
      <img class="game-piece" alt="alien" id="alien" src="${game.allGamePieces.alien}">
      <div class="alien hidden">${game.player1.token}</div>
  </div>`
};


function renderClassicGamePieces() {

  subtitle.innerText = 'Choose your fighter!';

  allGamePiecesContainer.innerHTML = '';

  allGamePiecesContainer.innerHTML += 
  `<div class="pieces-container">
      <img class="game-piece" alt="rock" id="rock" src="${game.allGamePieces.rock}">
  <div class="rock hidden">${game.player1.token}</div>
  </div>
  <div class="pieces-container">
      <img class="game-piece" alt="paper" id="paper" src="${game.allGamePieces.paper}">
      <div class="paper hidden">${game.player1.token}</div>
  </div>
  <div class="pieces-container">
      <img class="game-piece" alt="scissors" id="scissors" src="${game.allGamePieces.scissors}">
      <div class="scissors hidden">${game.player1.token}</div>
  </div>`
};

function createGamePiecesImages(rockImage, paperImage, scissorsImage, lizardImage, alienImage) {
  var playingPieces = {rock: rockImage, paper: paperImage, scissors: scissorsImage, lizard: lizardImage, alien: alienImage}
    return playingPieces;
  };

function createPlayer(personOrComputer, token) {
  return {name: personOrComputer, token: token,  wins: 0, wonThisRound: false, chosenPiece: 'piece'};
};


function hideGameOnPageLoad() {
  allGamePiecesContainer.classList.add('hidden'); 
};

function goToClassicGame() {
  game.classicOrHard = 'classic';
  classicAndHardContainers.classList.add('hidden');
  changeGameButton.classList.remove('hidden');
  subtitle.innerText = 'Choose your fighter!';
  allGamePiecesContainer.classList.remove('hidden');
  
  for (var i = 0; i < gamePieces.length; i++) {
    if (gamePieces[i].alt === 'lizard') {
      gamePieces[i].classList.add('hidden');
    }
    if (gamePieces[i].alt === 'alien') {
      gamePieces[i].classList.add('hidden');
    }
  }
};

function goToHardGame() {
  game.classicOrHard = 'hard';
  changeGameButton.classList.remove('hidden');
  classicAndHardContainers.classList.add('hidden');
  allGamePiecesContainer.classList.remove('hidden');
  
  for (var i = 0; i < gamePieces.length; i++) {
    if (gamePieces[i].alt === 'lizard') {
      gamePieces[i].classList.remove('hidden');
    }
    if (gamePieces[i].alt === 'alien') {
      gamePieces[i].classList.remove('hidden');
    }
  }
};

function goBackToHomePage() {
  classicAndHardContainers.classList.remove('hidden');
  changeGameButton.classList.add('hidden');
  allGamePiecesContainer.classList.add('hidden');
  subtitle.innerText = 'Choose your game!';
};


