/************************************************************************************/
objects = [
  { name: "rock", action: "crushes", beats: "scissors" },
  { name: "paper", action: "covers", beats: "rock" },
  { name: "scissors", action: "cuts", beats: "paper" },
];

// let playerScore = 0;
// let computerScore = 0;
// let tieScore = 0;
// let roundNo = 1;
//
// const roundNoField = document.querySelector('.summary-card__round');
// const playerSelectionImage = document.querySelector('.player-card__img__img');
// const computerSelectionImage = document.querySelector('.computer-card__img__img');
// const playerScoreField = document.querySelector('.player-card__score');
// const computerScoreField = document.querySelector('.computer-card__score');
//
// const finalResults = document.querySelector('.banner');
// const roundResultsField = document.querySelector('.summary-card__info');
//
// /************************************************************************************/
//
// function newGame() {
//   resetSelections();
//   resetResults();
//   resetFinalResults();
// }

// function updateSelections(playerSelection, computerSelection) {
//   roundNoField.textContent = `${roundNo++}`;
//   playerSelectionImage.src = `./assets/images/${playerSelection}.png`;
//   computerSelectionImage.src = `./assets/images/${computerSelection}.png`;
// }
//
//
// function updateFinalResults(winner) {
//   finalResults.textContent = `${winner} wins the game!`;
// }
//
// function resetSelections() {
//     roundNoField.textContent = `${roundNo++}`;
//     playerSelectionImage.src = `./assets/images/rock.png`;
//     computerSelectionImage.src = `./assets/images/rock.png`;
// }
//
// function resetResults() {
//     playerScore = computerScore = tieScore = 0;
//   roundNo = 1;
//
//   roundNoField.textContent = roundNo;
//
//     playerScoreField.textContent = playerScore;
//   computerScoreField.textContent = computerScore;
//   roundResultsField.textContent = 'Let\'s begin';
// }
//
// function resetFinalResults() {
//     finalResults.textContent = 'Score 5 points to win';
// }
//
// function wantsToPlayAgain() {
//     let answer = prompt("Do you want to play again?");
//
//     if(answer !== "no") {
//         newGame();
//     } else {
//         window.open("./gameOver.html", "_self");
//     }
// }
//
// function updateResults(playerSelection, computerSelection, winner, msg) {
//     let winnerScore;
//     if (winner === "computer") {
//         winnerScore = computerScore;
//     } else if (winner === "player") {
//         winnerScore = playerScore;
//     }
//
//     console.log('winner is ' + winner);
//     if (winner !== 'tie') {
//         const winnerField = document.querySelector(`.${winner}-card__score`);
//         winnerField.textContent = winnerScore;
//     }
//
//     roundResultsField.textContent = msg;
// }

// function computeResults(playerSelection, computerSelection) {
//   let msg, winner;
//   if (playerSelection === computerSelection) {
//     playSound('tie');
//     msg = `This round is a draw ${playerSelection} cant beat ${computerSelection}. `;
//     winner = "tie";
//     tieScore++;
//   } else if (itemDefeats[playerSelection] === computerSelection) {
//     playSound(playerSelection);
//     msg = `You win this round! ${playerSelection} beats ${computerSelection}. `;
//     winner = "player";
//     playerScore++;
//   } else if (itemDefeats[computerSelection] === playerSelection) {
//     playSound(computerSelection);
//     msg = `Computer wins this round! ${computerSelection} beats ${playerSelection}. `;
//     winner = "computer"
//     computerScore++;
//   }
//
//   console.log(`Player: ${playerSelection}, ${playerScore}`);
//   console.log(`Computer: ${computerSelection}, ${computerScore}`);
//
//   return {winner, msg};
// }

function getComputerChoice() {
  // return a random item
  let randomIndex = Math.floor(Math.random() * 3);
  return objects[randomIndex];
}

function getGameResult(playerScore, computerScore) {
  if (playerScore > computerScore) {
    return `You won the game! you beat the computer ${playerScore}-${computerScore}`;
  } else if (playerScore === computerScore) {
    return "The game ended in a draw";
  } else {
    return `You lost the game! Computer beat you ${computerScore}-${playerScore}`;
  }
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection.name === computerSelection.name) return "It is a tie";
  if (playerSelection.beats === computerSelection.name) {
    return `You win this round! ${playerSelection.name} ${playerSelection.action} ${computerSelection.name}`;
  } else {
    return `You lose this round! ${computerSelection.name} ${computerSelection.action} ${playerSelection.name}`;
  }
}

function game() {
  let playerScore = 0;
  let computerScore = 0;

  // a game consists of 5 rounds
  for (let i = 0; i < 5; i++) {
    const playerSelection = {
      name: "rock",
      action: "crushes",
      beats: "scissors",
    };
    const computerSelection = getComputerChoice();

    const result = playRound(playerSelection, computerSelection);
    console.log(result);

    if (result.includes("win")) playerScore++;
    if (result.includes("lose")) computerScore++;
  }

  const gameResult = getGameResult(playerScore, computerScore);
  console.log(gameResult);
}

// function playRound(playerSelection) {
//   if (playerScore === 5 || computerScore === 5) {
//       wantsToPlayAgain();
//   }
//   // functionality to check who wins the round
//   const computerSelection = getComputerChoice();

//   updateSelections(playerSelection, computerSelection);
//   console.log(playerSelection, computerSelection);
//   let {winner, msg} = computeResults(playerSelection, computerSelection);
//   updateResults(playerSelection, computerSelection, winner, msg);
//
//   // Reset the scores once one of the players wins 5 points
//   if (playerScore === 5 || computerScore === 5) {
//     winner = playerScore === 5 ? 'player' : 'computer';
//     updateFinalResults(winner);
//   }
// }
//
// function playSound(sound) {
//   const audio = document.querySelector(`.${sound}-sound`);
//   console.log(audio);
//   audio.currentTime = 0;
//   audio.play();
// }

// Play round by choosing one of rock, paper or scissor
const playerOptions = document.querySelector(".player-card__options");
playerOptions.addEventListener("click", (e) => {
  const optionDiv = e.target.closest("div");
  console.log(e.target);
  if (!optionDiv.classList.contains("card__option")) return;
  // playSound("click");
  const object = optionDiv.getAttribute("data-option");
  playRound(object);
});
