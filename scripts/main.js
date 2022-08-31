/************************************************************************************/
const objects = [
  { name: "rock", action: "crushes", beats: "scissors" },
  { name: "paper", action: "covers", beats: "rock" },
  { name: "scissors", action: "cuts", beats: "paper" },
];

let playerScore = 0;
let computerScore = 0;

const playerSelectionImage = document.querySelector(".player-card__img__img");
const computerSelectionImage = document.querySelector(".computer-card__img__img");
const playerScoreField = document.querySelector(".player-card__score");
const computerScoreField = document.querySelector(".computer-card__score");

const roundResultsField = document.querySelector(".summary-card__info");
const summaryPage = document.querySelector(".game_summary_page");
/************************************************************************************/

function newGame() {
  resetSelections();
  resetResults();
}

function resetSelections() {
    playerSelectionImage.src = `./assets/images/rock.png`;
    computerSelectionImage.src = `./assets/images/rock.png`;
}

function resetResults() {
  playerScore = computerScore = 0;
  playerScoreField.textContent = playerScore;
  computerScoreField.textContent = computerScore;
  roundResultsField.textContent = "Let's begin";
}

function showGameSummaryPage() {
  const gameResult = getGameResult(playerScore, computerScore);
  summaryPage.classList.remove('hidden');
  summaryPage.style.display = 'flex';

  const final_results = summaryPage.querySelector('.final_results');
  final_results.textContent = gameResult;

}

function endGame() {
  // remove event listeners on options
  playerOptions.removeEventListener("click", playerSelectionHandler);
  // give some gap and show the game summary screen on top
  setTimeout(showGameSummaryPage, 1000);
}

function updateResults(result) {
  console.log(result);
  roundResultsField.textContent = result;
  playerScoreField.textContent = playerScore;
  computerScoreField.textContent = computerScore;
}

function updateSelections(playerSelection, computerSelection) {
  playerSelectionImage.src = `./assets/images/${playerSelection.name}.png`;
  computerSelectionImage.src = `./assets/images/${computerSelection.name}.png`;
}

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

function getRoundResult(playerSelection, computerSelection) {
  if (playerSelection.name === computerSelection.name) {
    playSound("tie");
    return "It is a tie";
  }
  if (playerSelection.beats === computerSelection.name) {
    playSound(playerSelection.name);
    return `You win this round! ${playerSelection.name} ${playerSelection.action} ${computerSelection.name}`;
  } else {
    playSound(computerSelection.name);
    return `You lose this round! ${computerSelection.name} ${computerSelection.action} ${playerSelection.name}`;
  }
}

function playRound(playerSelection) {
  // functionality to check who wins the round
  const computerSelection = getComputerChoice();
  console.log(playerSelection, computerSelection);
  updateSelections(playerSelection, computerSelection);

  const result = getRoundResult(playerSelection, computerSelection);

  if (result.includes("win")) playerScore++;
  if (result.includes("lose")) computerScore++;

  console.log(result);
  updateResults(result);

  // Reset the scores once one of the players wins 5 points
  if (playerScore === 5 || computerScore === 5) {
    // show the final results first and ask if they want to play again
    endGame();
  }
}

function playSound(sound) {
  const audio = document.querySelector(`.${sound}-sound`);
  console.log(audio);
  audio.currentTime = 0;
  audio.play();
}

function playerSelectionHandler(e) {
  const optionDiv = e.target.closest("div");
  console.log(e.target);
  if (!optionDiv.classList.contains("card__option")) return;
  playSound("click");
  const option = optionDiv.getAttribute("data-option");
  const object = objects[option];
  playRound(object);
}

// Play round by choosing one of rock, paper or scissor
const playerOptions = document.querySelector(".player-card__options");
playerOptions.addEventListener("click", playerSelectionHandler);
