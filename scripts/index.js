gameItems = ['rock', 'paper', 'scissors'];
itemDefeats = {'rock': 'scissors',
                'paper': 'rock',
                'scissors': 'paper'
                }
playerScore = computerScore = tieScore = 0;

function computerPlay() {
    // return a random item
    randomIndex = Math.floor(Math.random() * 3);
    randomItem = gameItems[randomIndex];
    return randomItem;
}

function updateSelections(playerSelection, computerSelection) {
    const playerSelectionField = document.querySelector('#playerSelection');
    playerSelectionField.style['background'] = `url('assets/images/selections/${playerSelection}.png')  no-repeat`;
    playerSelectionField.style['background-size'] = "cover";

    const computerSelectionField = document.querySelector('#computerSelection');
    computerSelectionField.style['background'] = `url('assets/images/selections/${computerSelection}.png')  no-repeat`;
    computerSelectionField.style['background-size'] = "cover";

    const playerSelectionResult = document.querySelector('#playerResults');
    playerSelectionResult.style['background'] = `url('assets/images/selections/${playerSelection}.png')  no-repeat`;
    playerSelectionResult.style['background-size'] = "cover";
    
    const computerSelectionResult = document.querySelector('#computerResults');
    computerSelectionResult.style['background'] = `url('assets/images/selections/${computerSelection}.png')  no-repeat`;
    computerSelectionResult.style['background-size'] = "cover";
}

function computeResults(playerSelection, computerSelection) {
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
    const winnerField = document.querySelector(`#${winner}Wins`);
    const winnerFieldScore = winnerField.querySelector('#score')
    winnerFieldScore.textContent = eval(`${winner}Score`);


    const roundResultsField = document.querySelector('#roundResults span');
    let result = winner === "tie" ? 'It\'s a tie' : `${winner} wins!`; 
    roundResultsField.textContent = result;
}

function resetSelections() {
    const playerSelectionField = document.querySelector('#playerSelection');
    playerSelectionField.style['background'] = `url('assets/images/selections/rpslogo.png')  no-repeat`;
    playerSelectionField.style['background-size'] = "cover";

    const computerSelectionField = document.querySelector('#computerSelection');
    computerSelectionField.style['background'] = `url('assets/images/selections/rpslogo.png')  no-repeat`;
    computerSelectionField.style['background-size'] = "cover";

    const playerSelectionResult = document.querySelector('#playerResults');
    playerSelectionResult.style['background'] = `url('assets/images/selections/rpslogosmall.png')  no-repeat`;
    playerSelectionResult.style['background-size'] = "cover";
    
    const computerSelectionResult = document.querySelector('#computerResults');
    computerSelectionResult.style['background'] = `url('assets/images/selections/rpslogosmall.png')  no-repeat`;
    computerSelectionResult.style['background-size'] = "cover";
}

function resetResults(winner) {
    
}

function playRound(e) {
    // functionality to check who wins the round
    const playerSelection = e.target.value;
    const computerSelection = computerPlay();

    updateSelections(playerSelection, computerSelection);
    let winner = computeResults(playerSelection, computerSelection);
    updateResults(playerSelection, computerSelection, winner); 

    // Reset the scores once one of the players wins 5 points
    if (playerScore == 5) {
        winner = 'player';
        resetSelections();
        resetResults(winner);
    } else if (computerScore == 5) {
        winner= 'computer';
        resetSelections();
        resetResults(winner);
    }
}

const buttons = document.querySelectorAll('#playerCard button');
buttons.forEach(button => button.addEventListener('click', playRound) );
