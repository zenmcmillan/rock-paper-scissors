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
  goToClassicGame(event);
  renderClassicGamePieces()

});

hardButton.addEventListener('click',function(event) {
  goToHardGame();
  renderHardGamePieces()
});

changeGameButton.addEventListener('click', function() {
 goBackToHomePage()
});

allGamePiecesContainer.addEventListener('click', function(event) {
  if (game.classicOrHard === 'classic') {
    makeGameFunctional(event, ['classicGameBoard'])
    renderPlayerData()
    
   
    showEmoji()
    setTimeout(showChosenPieces, 1000)
    setTimeout(hideEmoji, 1000)
    setTimeout(showWhoWonTheRound, 1000)
    setTimeout(handleDrawState, 1000)
    setTimeout(resetClassicGame, 2500)
    setTimeout(resetAfterDrawClassic, 2500)
  } else {
    makeGameFunctional(event, ['hardGameBoard'])
    renderPlayerData()
    showEmoji()
    setTimeout(showChosenPieces, 1000)
    setTimeout(hideEmoji, 1000)
    setTimeout(showWhoWonTheRound, 1000)
    setTimeout (handleDrawState, 1000)
    setTimeout(resetHardGame, 2500)
    setTimeout(resetAfterDrawHard, 2500)
  } 
 });


// event handlers

function handleDrawState() {
  if (game.draw && playersClickedPiece === 'rock') {
    allGamePiecesContainer.innerHTML += `
    <div class="pieces-container">
      <img class="game-piece" alt="rock" id="rock" src="./assets/happy-rocks.png">
   </div>`
 }
 else if (game.draw && playersClickedPiece === 'paper') {
  allGamePiecesContainer.innerHTML += `
  <div class="pieces-container">
  <img class="game-piece" alt="paper" id="paper" src="./assets/happy-paper.png">
 </div>`
}
else if (game.draw && playersClickedPiece === 'scissors') {
  allGamePiecesContainer.innerHTML += `
  <div class="pieces-container">
    <img class="game-piece" alt="scissors" id="scissors" src="./assets/happy-scissors.png">
  </div>`
}
else if (game.draw && playersClickedPiece === 'lizard') {
  allGamePiecesContainer.innerHTML += `
  <div class="pieces-container">
    <img class="game-piece"  alt="lizard" id="lizard" src="./assets/lizard.png">
  </div>`
}
else if (game.draw && playersClickedPiece === 'alien') {
  allGamePiecesContainer.innerHTML += `
  <div class="pieces-container">
    <img class="game-piece"  alt="alien" id="alien" src="./assets/happy-alien.png">
  </div>`
  }
};
  
function showChosenPieces() {
  for (var i = 0; i < gamePieces.length; i++) {
    if (gamePieces[i].alt !== playersClickedPiece && gamePieces[i].alt !== computersChosenPiece) {
      gamePieces[i].classList.add('hidden')
    } 
  }   
}

function hideEmoji() {
  for (var i = 0; i < emojis.length; i++) {
    if (emojis[i].name === playersClickedPiece) {
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
function renderClassicGame() {

  allGamePiecesContainer.innerHTML = '';

  allGamePiecesContainer.innerHTML += 
  `<div class="all-game-pieces-container">
    <div class="pieces-container">
    <img class="game-piece" alt="rock" id="rock" src="">
  <div class="emoji rock hidden" name="rock">🙂</div>
  </div>
  <div class="pieces-container">
    <img class="game-piece" alt="paper" id="paper" src="./assets/happy-paper.png">
    <div class="emoji paper hidden">🙂</div>
  </div>
  <div class="pieces-container">
    <img class="game-piece" alt="scissors" id="scissors" src="./assets/happy-paper.png">
    <div class="emoji scissors hidden">🙂</div>
  </div>`
}

function createGame() {
 var player1 = createPlayer('You', '🙂');
 var player2 = createPlayer('Computer', '💻');
 var theGamePieces = createGamePiecesImages(`./assets/happy-rocks.png`, `./assets/happy-paper.png`, `./assets/happy-scissors.png`,`./assets/lizard.png`,`./assets/happy-alien.png`,)
 game = {player1, player2, classicGameBoard: ['rock', 'paper', 'scissors'], 
  hardGameBoard: ['rock', 'paper', 'scissors', 'alien', 'lizard'], classicOrHard: null, draw: false, allGamePieces: theGamePieces}
 console.log(game)

}


function renderHardGamePieces() {

  allGamePiecesContainer.innerHTML = ''

  allGamePiecesContainer.innerHTML += 
  `<div class="pieces-container">
      <img class="game-piece rock "alt="rock" src="${game.allGamePieces.rock}">
  <div class="emoji rock-emoji hidden" name="rock">🙂</div>
  </div>
  <div class="pieces-container">
      <img class="game-piece paper" alt="paper" id="paper" src="${game.allGamePieces.paper}">
      <div class="emoji paper-emoji hidden">🙂</div>
  </div>
  <div class="pieces-container">
      <img class="game-piece scissors" alt="scissors" id="scissors" src="${game.allGamePieces.scissors}">
      <div class="emoji scissors-emoji hidden">🙂</div>
  </div>
  <div class="pieces-container scissors">
     <img class="game-piece lizard"  alt="lizard" id="lizard" src="${game.allGamePieces.lizard}">
     <div class="emoji lizard-emoji hidden">🙂</div>
  </div>
  <div class="pieces-container">
      <img class="game-piece alien"  alt="alien" id="alien" src="${game.allGamePieces.alien}">
      <div class="emoji alien-emoji hidden">🙂</div>
</div>`
}

function renderClassicGamePieces() {

  allGamePiecesContainer.innerHTML = ''

  allGamePiecesContainer.innerHTML += 
  `<div class="pieces-container">
      <img class="game-piece rock "alt="rock" src="${game.allGamePieces.rock}">
  <div class="emoji rock-emoji hidden" name="rock">🙂</div>
  </div>
  <div class="pieces-container">
      <img class="game-piece paper" alt="paper" id="paper" src="${game.allGamePieces.paper}">
      <div class="emoji paper-emoji hidden">🙂</div>
  </div>
  <div class="pieces-container">
      <img class="game-piece scissors" alt="scissors" id="scissors" src="${game.allGamePieces.scissors}">
      <div class="emoji scissors-emoji hidden">🙂</div>
  </div>`
}




function createGamePiecesImages(rockImage, paperImage, scissorsImage, lizardImage, alienImage) {
   var playingPieces = {
    rock: rockImage, paper: paperImage, scissors: scissorsImage, lizard: lizardImage, alien: alienImage}
    return playingPieces
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
   if (!game.draw) {
    for (var i = 0; i < gamePieces.length; i++) {
      gamePieces[0].classList.remove('hidden')
      gamePieces[1].classList.remove('hidden')
      gamePieces[2].classList.remove('hidden')
      subtitle.innerText = 'Choose your fighter!'
    }
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
    subtitle.innerText = 'Choose your fighter!'
  }
 }
}

function goBackToHomePage() {
  classicAndHardContainers.classList.remove('hidden');
  changeGameButton.classList.add('hidden');
  allGamePiecesContainer.classList.add('hidden')
  subtitle.innerText = 'Choose your game!';
};


function resetAfterDrawClassic() {
  if(game.draw) {
   console.log('testing 1')
    game.draw = false
    allGamePiecesContainer.innerHTML = '';
    allGamePiecesContainer.innerHTML += 
    ` <div class="pieces-container">
    <img class="game-piece" alt="rock" id="rock" src="./assets/happy-rocks.png">
    <div class="emoji rock hidden" name="rock">🙂</div>
  </div>
  <div class="pieces-container">
    <img class="game-piece" alt="paper" id="paper" src="./assets/happy-paper.png">
    <div class="emoji paper hidden">🙂</div>
  </div>
  <div class="pieces-container">
    <img class="game-piece" alt="scissors" id="scissors" src="./assets/happy-scissors.png">
    <div class="emoji scissors hidden">🙂</div>
  </div>`
  }
  subtitle.innerText = 'Choose your figher!'
  console.log("testing 2")
}

function resetAfterDrawHard() {
  if(game.draw) {
    allGamePiecesContainer.innerHTML = '';
    allGamePiecesContainer.innerHTML +=`
    <div class="pieces-container">
    <img class="game-piece" alt="rock" id="rock" src="./assets/happy-rocks.png">
    <div class="emoji rock hidden" name="rock">🙂</div>
  </div>
  <div class="pieces-container">
    <img class="game-piece" alt="paper" id="paper" src="./assets/happy-paper.png">
    <div class="emoji paper hidden">🙂</div>
  </div>
  <div class="pieces-container">
    <img class="game-piece" alt="scissors" id="scissors" src="./assets/happy-scissors.png">
    <div class="emoji scissors hidden">🙂</div>
  </div>
  <div class="pieces-container">
    <img class="game-piece"  alt="lizard" id="lizard" src="./assets/lizard.png">
    <div class="emoji lizard hidden">🙂</div>
  </div>
  <div class="pieces-container">
    <img class="game-piece"  alt="alien" id="alien" src="./assets/happy-alien.png">
    <div class="emoji alien hidden">🙂</div>
  </div>
</div>`
  }
}