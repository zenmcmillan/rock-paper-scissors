// query selectors

var classicButton = document.querySelector('.classic-button');
var classicAndHardContainers = document.querySelector('.classic-and-hard');
var hardButton = document.querySelector('.hard-button');
var changeGameButton = document.querySelector('.change-game-button');
var subtitle = document.querySelector('.subtitle');
var personalGameInfo = document.querySelector('.personal-game-info');
var computerGameInfo = document.querySelector('.computer-game-info');
var classicGameBoardContainer = document.querySelector('.classic-gameboard-container');
var classicGameBoard = document.querySelector('.classic-gameboard');
var harderPiecesGameboardContainer = document.querySelector('.harder-pieces-gameboard');
var allGamePiecesContainer = document.querySelector('.all-game-pieces-container');
var emojis = document.querySelectorAll('.emoji')
var computerGameInfo = document.querySelector('.computer-game-info');
var piecesContainer = document.querySelectorAll('.pieces-container');
var gamePieces = document.querySelectorAll('.game-piece');
var rock = document.querySelector('.rock')
var paper = document.querySelector('.paper')
var scissors = document.querySelector('.scissors')
var alien = document.querySelector('.alien')
var lizard = document.querySelector('.lizard')
var allDivs = document.querySelectorAll('div')

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

classicButton.addEventListener('click', function(event) {
  goToClassicGame();

});

hardButton.addEventListener('click',function(event) {
  goToHardGame();
 
});

changeGameButton.addEventListener('click', function() {
 goBackToHomePage()
});

// allGamePiecesContainer.addEventListener('click', function(event) {
//   if (gamePieces) {
//     makeGameFunctional(event, ['classicGameBoard'])
//   } else {
//     makeGameFunctional(event, ['hardGameBoard'])
//   } 
//   renderPlayerData()
//   showEmoji()
//   setTimeout(showChosenPieces, 1000)
//   setTimeout(hideEmoji, 1000)
//  setTimeout(showWhoWonTheRound, 1000)
//  setTimeout(resetHardGame, 2000)
//  });

allGamePiecesContainer.addEventListener('click', function(event) {
  if (game.classicOrHard === 'classic') {
    makeGameFunctional(event, ['classicGameBoard'])
    renderPlayerData()
  showEmoji()
  setTimeout(showChosenPieces, 1000)
  setTimeout(hideEmoji, 1000)
  setTimeout(showWhoWonTheRound, 1000)
  setTimeout(resetClassicGame, 2000)
  } else {
    makeGameFunctional(event, ['hardGameBoard'])
    renderPlayerData()
  showEmoji()
  setTimeout(showChosenPieces, 1000)
  setTimeout(hideEmoji, 1000)
 setTimeout(showWhoWonTheRound, 1000)
 setTimeout(resetHardGame, 2000)
  } 
//   renderPlayerData()
//   showEmoji()
//   setTimeout(showChosenPieces, 1000)
//   setTimeout(hideEmoji, 1000)
//  setTimeout(showWhoWonTheRound, 1000)
//  setTimeout(resetHardGame, 2000)
 });


// event handlers


function showChosenPieces() {
  for (var i = 0; i < gamePieces.length; i++) {
    if (gamePieces[i].alt !== playersClickedPiece && gamePieces[i].alt !== computersChosenPiece) {
      gamePieces[i].classList.add('hidden')
    } 
  } 
}

function hideEmoji() {
  for (var i = 0; i < emojis.length; i++) {
    if (emojis[i].classList[1] === playersClickedPiece) {
      emojis[i].classList.add('hidden')
    }
  }
}

function showEmoji() {
  if (playersClickedPiece === 'rock') {
    rock.classList.remove('hidden')
  }
  else if (playersClickedPiece === 'paper') {
    paper.classList.remove('hidden')
  }
  else if (playersClickedPiece === 'scissors') {
    scissors.classList.remove('hidden')
  }
  else if (playersClickedPiece === 'lizard') {
   lizard.classList.remove('hidden')
  }
  else if (playersClickedPiece === 'alien') {
    alien.classList.remove('hidden')
  }
}

function makeGameFunctional(event, [gameArray]) {
  playerClicksPiece(event)
  computerTakingItsTurn(game, [gameArray])
  createGameFunctionality(game, playersClickedPiece, computersChosenPiece)
}

function showWhoWonTheRound() {
  if (game.player1.wonThisRound) {
    subtitle.innerText = '🙂 You won this round! 🙂'
  }
  else if(game.player2.wonThisRound) {
    subtitle.innerText = '💻 Computer won this round! 💻'
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
  hardGameBoard: ['rock', 'paper', 'scissors', 'alien', 'lizard'], classicOrHard: null, draw: false}
 console.log(game)
}

function createPlayer(personOrComputer, token) {
  return {name: personOrComputer, token: token,  wins: 0, wonThisRound: false, chosenPiece: 'piece'}
};

function hideGameOnPageLoad() {
  allGamePiecesContainer.classList.add('hidden')  
}

function goToClassicGame() {
  game.classicOrHard = 'classic'
  classicAndHardContainers.classList.add('hidden')
  changeGameButton.classList.remove('hidden');
  subtitle.innerText = 'Choose your fighter!';
  allGamePiecesContainer.classList.remove('hidden')
  for (var i = 0; i < gamePieces.length; i++) {
    if (gamePieces[i].alt === 'lizard') {
      gamePieces[i].classList.add('hidden')
    }
    if (gamePieces[i].alt === 'alien') {
      gamePieces[i].classList.add('hidden')
    }
    console.log()
  }
};

function resetClassicGame() {
  for (var i = 0; i < gamePieces.length; i++) {
      gamePieces[0].classList.remove('hidden')
      gamePieces[1].classList.remove('hidden')
      gamePieces[2].classList.remove('hidden')
    }
  }


function goToHardGame() {
  game.classicOrHard = 'hard'
  changeGameButton.classList.remove('hidden')
  classicAndHardContainers.classList.add('hidden')
  allGamePiecesContainer.classList.remove('hidden')
  for (var i = 0; i < gamePieces.length; i++) {
    if (gamePieces[i].alt === 'lizard') {
      gamePieces[i].classList.remove('hidden')
    }
    if (gamePieces[i].alt === 'alien') {
      gamePieces[i].classList.remove('hidden')
    }
  }
}

function resetHardGame() {
 for(var i = 0; i < gamePieces.length; i++) {
  if (gamePieces[i].classList.contains('hidden')) {
    gamePieces[i].classList.remove('hidden')
  }
 }
}

function goBackToHomePage() {
  classicAndHardContainers.classList.remove('hidden');
  changeGameButton.classList.add('hidden');
  allGamePiecesContainer.classList.add('hidden')
  subtitle.innerText = 'Choose your game!';
};

