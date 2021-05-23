gameItems = ['rock', 'paper', 'scissors'];
itemDefeats = {'rock': 'scissors',
                'paper': 'rock',
                'scissors': 'paper'
                }
playerScore = computerScore = tieScore = 0;
roundNo = 1;

function newGame() {
    resetSelections();
    resetResults();
    resetFinalResults();
}

function computerPlay() {
    // return a random item
    let randomIndex = Math.floor(Math.random() * 3);
    return gameItems[randomIndex];
}

function updateSelections(playerSelection, computerSelection) {
    const roundNoField = document.querySelector('h2 span');
    roundNoField.textContent = roundNo ++;

    // const playerSelectionField = document.querySelector('#playerSelection');
    // playerSelectionField.style['background'] = `url('assets/images/selections/${playerSelection}.png')  no-repeat center`;
    // playerSelectionField.style['background-size'] = "contain";

    // const computerSelectionField = document.querySelector('#computerSelection');
    // computerSelectionField.style['background'] = `url('assets/images/selections/${computerSelection}.png')  no-repeat center`;
    // computerSelectionField.style['background-size'] = "contain";

    // const playerSelectionResult = document.querySelector('#playerResults');
    // playerSelectionResult.style['background'] = `url('assets/images/selections/${playerSelection}.png')  no-repeat center`;
    // playerSelectionResult.style['background-size'] = "contain";
    //
    // const computerSelectionResult = document.querySelector('#computerResults');
    // computerSelectionResult.style['background'] = `url('assets/images/selections/${computerSelection}.png')  no-repeat center`;
    // computerSelectionResult.style['background-size'] = "contain";
}

function computeResults(playerSelection, computerSelection) {
    let msg, winner;
    if (playerSelection === computerSelection) {
        msg = `This round is a draw ${playerSelection} cant beat ${computerSelection}. `;
        winner = "tie";
        tieScore ++;
    } else if (itemDefeats[playerSelection] === computerSelection) {
        msg = `You win this round! ${playerSelection} beats ${computerSelection}. `;
        winner = "player";
        playerScore ++;
    } else if (itemDefeats[computerSelection] === playerSelection) {
        msg = `Computer wins this round! ${computerSelection} beats ${playerSelection}. `;
        winner = "computer"
        computerScore ++;
    }

    console.log(`Player: ${playerSelection}, ${playerScore}`);
    console.log(`Computer: ${computerSelection}, ${computerScore}`);

    return winner;
}

function updateResults(playerSelection, computerSelection, winner) {
    let winnerScore;
    if (winner === "computer") {
        winnerScore = computerScore;
    } else if (winner === "player") {
        winnerScore = playerScore;
    } else {
        winnerScore = tieScore;
    }
    // const winnerField = document.querySelector(`#${winner}Wins`);
    // const winnerFieldScore = winnerField.querySelector('#score')

    // winnerFieldScore.textContent = winnerScore;

    const roundResultsField = document.querySelector('.summary-card__info');
    let result = winner === "tie" ? 'It\'s a tie' : `${winner} wins!`;
    roundResultsField.textContent = result;
}

function updateFinalResults(winner) {
    const finalResults = document.querySelector('#finalResults');

    const finalResultsMessage = finalResults.querySelector('p');
    finalResultsMessage.textContent = `${winner} wins the game!`;

    const finalResultsScore = finalResults.querySelector('span');
    finalResultsScore.textContent = `${playerScore} : ${computerScore}`;
}

function resetSelections() {
    // const playerSelectionField = document.querySelector('#playerSelection');
    // playerSelectionField.style['background'] = `url('assets/images/selections/rpslogo.png')  no-repeat`;
    // playerSelectionField.style['background-size'] = "cover";
    //
    // const computerSelectionField = document.querySelector('#computerSelection');
    // computerSelectionField.style['background'] = `url('assets/images/selections/rpslogo.png')  no-repeat`;
    // computerSelectionField.style['background-size'] = "cover";
    //
    // const playerSelectionResult = document.querySelector('#playerResults');
    // playerSelectionResult.style['background'] = `url('assets/images/selections/rpslogosmall.png')  no-repeat center`;
    // playerSelectionResult.style['background-size'] = "contain";
    //
    // const computerSelectionResult = document.querySelector('#computerResults');
    // computerSelectionResult.style['background'] = `url('assets/images/selections/rpslogosmall.png')  no-repeat center`;
    // computerSelectionResult.style['background-size'] = "contain";
}

function resetResults() {
    playerScore = computerScore = tieScore = 0;
    roundNo = 1;

    const roundNoField = document.querySelector('h2 span');
    roundNoField.textContent = roundNo;

    const playerWinsField = document.querySelector('#playerWins');
    const playerWinsFieldScore = playerWinsField.querySelector('#score')
    playerWinsFieldScore.textContent = playerScore;

    const computerWinsField = document.querySelector('#computerWins');
    const computerWinsFieldScore = computerWinsField.querySelector('#score')
    computerWinsFieldScore.textContent = computerScore;

    const tieWinsField = document.querySelector('#tieWins');
    const tieWinsFieldScore = tieWinsField.querySelector('#score')
    tieWinsFieldScore.textContent = tieScore;

    const roundResultsField = document.querySelector('#roundResults span');
    roundResultsField.textContent = 'Let\'s begin';
}

function resetFinalResults() {
    const finalResults = document.querySelector('#finalResults');

    const finalResultsMessage = finalResults.querySelector('p');
    finalResultsMessage.textContent = 'Whoever scores 5 points first wins the game!';

    const finalResultsScore = finalResults.querySelector('span');
    finalResultsScore.textContent = '';
}

// function wantsToPlayAgain() {
//     answer = prompt("Do you want to play again?");

//     if(answer != "no") {
//         newGame();
//     } else {
//         window.open("./gameOver.html", "_self");
//     }
// }

function playRound(e) {
    if (playerScore === 5 || computerScore === 5) {
        newGame();
    }
    console.log(e.target);
    // functionality to check who wins the round
    const playerSelection = e.target.value;
    const computerSelection = computerPlay();

    updateSelections(playerSelection, computerSelection);
    console.log(playerSelection, computerSelection);
    let winner = computeResults(playerSelection, computerSelection);
    updateResults(playerSelection, computerSelection, winner);

    // Reset the scores once one of the players wins 5 points
    if (playerScore === 5 || computerScore === 5) {
        winner = playerScore === 5 ? 'player' : 'computer';
        updateFinalResults(winner);
        // wantsToPlayAgain();
    }
}

// Play round by choosing one of rock, paper or scissor
const buttons = document.querySelectorAll('.player-card__option');
buttons.forEach(button => button.addEventListener('click', playRound) );
