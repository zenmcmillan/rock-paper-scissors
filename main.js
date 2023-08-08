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
var paper = document.querySelector('.paper');
var scissors = document.querySelector('.scissors');
var alien = document.querySelector('.emoji[data-name="alien"]');
var lizard = document.querySelector('.emoji[data-name="lizard"]');
var hidden = document.querySelector('.hidden')


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
  createPlayerChosenPiece()

});
hardButton.addEventListener('click',function(event) {
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
   // makeGameFunctional(event, ['classicGameBoard'])
    renderPlayerData()
    playerClicksPiece(event)
    createComputerchosenPiece()
    computerTakingItsTurn(game,['classicGameBoard'])
    plugInPieces()
    showEmoji()
    disableGamePieces()
    setTimeout(showChosenPieces, 1000)
    setTimeout(renderPlayerData, 2000)
    setTimeout(renderClassicGamePieces, 2000)
   

    // showEmoji()
    // setTimeout(showChosenPieces, 1000)
    // setTimeout(hideEmoji, 1000)
    // setTimeout(showWhoWonTheRound, 1000)
    // setTimeout(handleDrawState, 1000)
    // setTimeout(resetClassicGame, 2500)
    // setTimeout(resetAfterDrawClassic, 2500)
  } else {
    renderPlayerData()
    playerClicksPiece(event)
    createComputerchosenPiece()
    computerTakingItsTurn(game,['hardGameBoard'])
    plugInPieces()
    showEmoji()
    disableGamePieces()
    setTimeout(showChosenPieces, 1000)
    setTimeout(renderPlayerData, 2000)
    setTimeout(renderHardGamePieces, 2000)
   
    
    // showEmoji()
    // setTimeout(showChosenPieces, 1000)
    // setTimeout(hideEmoji, 1000)
    // setTimeout(showWhoWonTheRound, 1000)
    // setTimeout (handleDrawState, 1000)
    // setTimeout(resetHardGame, 2500)
    // setTimeout(resetAfterDrawHard, 2500)
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
  
// function showChosenPieces() {
//   for (var i = 0; i < gamePieces.length; i++) {
//     if (gamePieces[i].alt !== playersClickedPiece && gamePieces[i].alt !== computersChosenPiece) {
//       gamePieces[i].classList.add('hidden')
//     } 
//   }   
// }

function showChosenPieces() {

  allGamePiecesContainer.innerHTML = ''

  allGamePiecesContainer.innerHTML += 

  `<div class="pieces-container">
      <img class="game-piece" src="${playersClickedPiece.image}">
  </div>
  <div class="pieces-container">
      <img class="game-piece" src="${computersChosenPiece.image}">
  </div>`
}


function hideEmoji() {
  for (var i = 0; i < emojis.length; i++) {
    if (emojis[i].name === playersClickedPiece) {
      emojis[i].classList.add('hidden')
    }
  }
}

function showEmoji() {
  console.log('test') 
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
  }

// function disableGamePieces() {
//   for (var i = 0; i < gamePieces.length; i++) {
//     gamePieces[i].style.pointerEvents = 'none';
//   }
// }

function disableGamePieces() {
  allGamePiecesContainer.style.pointerEvents = 'none'
}

function returnGamePiecesClick() {

  allGamePiecesContainer.style.pointerEvents = 'auto'
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
    playersClickedPiece.name = event.target.id
    playersClickedPiece.image = game.allGamePieces[playersClickedPiece.name]
   game.player1.chosenPiece = playersClickedPiece
   console.log('players clicked piece name:', playersClickedPiece.name)
   console.log('players clicked piece image:', playersClickedPiece.image)
      return  playersClickedPiece

};

function computerTakingItsTurn(game, [array]) {
  var gameChoice = game[array]
   computersChosenPiece.name = gameChoice[getRandomIndex(gameChoice)]
   computersChosenPiece.image = game.allGamePieces[computersChosenPiece.name]
  game.player2.chosenPiece = computersChosenPiece
  console.log("computers chosen name", computersChosenPiece.name)
  console.log("computers chosen image", computersChosenPiece.image)
  return console.log("computer:", game.player2.chosenPiece)
 };

// function playerClicksPiece(event) {
//   playersClickedPiece = event.target.id
//   game['allGamePieces']
//   if (clickedPieceId === 'rock') {

//   }
// }

function createComputerchosenPiece() {
  return computersChosenPiece = {name: null, image: null}
}

function createPlayerChosenPiece() {

 return playersClickedPiece = {name: null, image: null}
}


 
 function getRandomIndex(array) {
   return Math.floor(Math.random() * array.length)
 };

//  function makeGameFunctional(event, [gameArray]) {
//   playerClicksPiece(event)
//   computerTakingItsTurn(game, [gameArray])
//   createGameFunctionality(game, playersClickedPiece, computersChosenPiece)
// }

// plugGameIn(playersClickedPiece, computersChosenPiece) {

// }

function plugInPieces() {
 return createGameFunctionality(game, playersClickedPiece, computersChosenPiece)
}



function createGameFunctionality(game, playerPiece, computerPiece) {

    var playerPiece = playersClickedPiece.name
   var  computerPiece = computersChosenPiece.name
  
    if (playerPiece === 'rock' && computerPiece === 'scissors') { 
    game.player1.wins += 1
    game.player1.wonThisRound = true 
    game.player2.wonThisRound = false
    game.draw = false
   }
   else if (playerPiece === 'rock' &&  computerPiece === 'scissors') {
     game.player2.wins += 1
     game.player2.wonThisRound = true
     game.player1.wonThisRound = false
     game.draw = false
   }
   else if (playerPiece === 'rock' && computerPiece === 'rock') {
     game.player1.wonThisRound = false
     game.player2.wonThisRound = false
     game.draw = true
   }
   else if (playerPiece === 'rock' &&  computerPiece === 'paper') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  }
  else if (computerPiece === 'rock' && playerPiece === 'paper') {
    game.player2.wonThisRound = false
    game.player1.wonThisRound = false
    game.draw = true
  }

  else if (playerPiece === 'scissors' && computerPiece === 'paper') {
     game.player1.wins += 1
     game.player1.wonThisRound = true
     game.player2.wonThisRound = false
     game.draw = false
   }
   else if (playerPiece === 'scissors' && computerPiece === 'paper') {
     game.player2.wins += 1
     game.player2.wonThisRound = true
     game.player1.wonThisRound = false
     game.draw = false
  }
  else if (playerPiece === 'scissors' && computerPiece === 'lizard') {
    game.player1.wins += 1
     game.player1.wonThisRound = true
     game.player2.wonThisRound = false
     game.draw = false
  } 
  else if (playerPiece === 'scissors' && computerPiece === 'lizard') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
 } 
  else if (playerPiece === 'scissors' && computerPiece === 'scissors') {
    game.player1.wonThisRound = false
    game.player2.wonThisRound = false
    game.draw = true
  }
  else if (playerPiece === 'lizard' && computerPiece === 'scissors') {
    game.player2.wonThisRound = false
    game.player1.wonThisRound = false
    game.draw = true
 }
  else if (playerPiece === 'paper' && computerPiece === 'rock') {
     game.player1.wins += 1
     game.player1.wonThisRound = true
     game.player2.wonThisRound = false
     game.draw = false
   }
   else if (playerPiece === 'paper' && computerPiece === 'rock') {
     game.player2.wins += 1
     game.player2.wonThisRound = true
     game.player1.wonThisRound = false
     game.draw = false
  }
  else if (playerPiece === 'paper' && computerPiece === 'paper') {
    game.player1.wonThisRound = false
    game.player2.wonThisRound = false
    game.draw = true
  }
  else if (playerPiece === 'lizard' && computerPiece === 'paper') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  }
  else if (playerPiece === 'lizard' && computerPiece === 'paper') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  }
  else if (playerPiece === 'lizard' && computerPiece === 'lizard') {
    game.player1.wonThisRound = false
    game.player2.wonThisRound = false
    game.draw = true
  }
  else if (playerPiece === 'alien' && computerPiece === 'scissors') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  }
  else if (playerPiece === 'alien' &&computerPiece === 'scissors') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  } 

  else if (playerPiece === 'alien' && computerPiece === 'alien') {
    game.player1.wonThisRound = false
    game.player2.wonThisRound = false
    game.draw = true
  } 
  else if (playerPiece === 'alien' && computerPiece === 'rock') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  }  
  else if (playerPiece === 'alien' && computerPiece === 'rock') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  } 
  else if (playerPiece === 'alien' && computerPiece === 'paper') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  }
  else if (playerPiece === 'paper' &&computerPiece === 'alien') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  } 
  else if (playerPiece === 'rock' && computerPiece === 'lizard') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  } else if (playerPiece === 'rock' && computerPiece === 'lizard') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  } 
  else if (playerPiece === 'paper' && computerPiece === 'alien') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  } 
  else if (playerPiece === 'paper' && computerPiece === 'alien') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  }
   else if (playerPiece === 'scissors' && computerPiece === 'lizard') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  } 
  else if (playerPiece === 'scissors' && computerPiece === 'lizard') {
    game.player2.wins += 1
    game.player2.wonThisRound = true
    game.player1.wonThisRound = false
    game.draw = false
  }
  else if (playerPiece === 'lizard' && computerPiece === 'alien') {
    game.player1.wins += 1
    game.player1.wonThisRound = true
    game.player2.wonThisRound = false
    game.draw = false
  } 
  else if (playerPiece === 'lizard' && computerPiece === 'alien') {
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
 var theGamePieces = createGamePiecesImages(`./assets/happy-rocks.png`, `./assets/happy-paper.png`, `./assets/happy-scissors.png`,`./assets/lizard.png`,`./assets/happy-alien.png`,)
 game = {player1, player2, classicGameBoard: ['rock', 'paper', 'scissors'], 
  hardGameBoard: ['rock', 'paper', 'scissors', 'alien', 'lizard'], classicOrHard: null, draw: false, allGamePieces: theGamePieces, playerPieceToRender: null, computerPieceToRender: null}
 console.log(game)
}


function renderHardGamePieces() {

  allGamePiecesContainer.innerHTML = ''

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
  </div>
  <div class="pieces-container">
     <img class="game-piece"  alt="lizard" id="lizard" src="${game.allGamePieces.lizard}">
     <div class="lizard hidden">${game.player1.token}</div>
  </div>
  <div class="pieces-container">
      <img class="game-piece" alt="alien" id="alien" src="${game.allGamePieces.alien}">
      <div class="alien hidden">${game.player1.token}</div>
</div>`
}


function renderClassicGamePieces() {


  
  allGamePiecesContainer.innerHTML = ''

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
    <div class=" paper hidden">🙂</div>
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