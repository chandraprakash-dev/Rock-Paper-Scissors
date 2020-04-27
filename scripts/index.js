gameItems = ['rock', 'paper', 'scissors'];
itemDefeats = {'rock': 'scissors',
                'paper': 'rock',
                'scissors': 'paper'
                }
playerScore = computerScore = 0;

function computerPlay() {
    // return a random item
    randomIndex = Math.floor(Math.random() * 3);
    randomItem = gameItems[randomIndex];
    return randomItem;
}

function playRound(e) {
    // functionality to check who wins the round
    const playerSelection = e.target.value;
    const computerSelection = computerPlay();
    // const results = document.querySelector('#results');
    // const finalResults = document.querySelector('#finalResult');
    let msg;

    if (playerSelection === computerSelection) {
        msg = `This round is a draw ${playerSelection} cant beat ${computerSelection}. `;
    } else if (itemDefeats[playerSelection] === computerSelection) {
        msg = `You win this round! ${playerSelection} beats ${computerSelection}. `;
        playerScore ++;
    } else if (itemDefeats[computerSelection] === playerSelection) {
        msg = `Computer wins this round! ${computerSelection} beats ${playerSelection}. `;
        computerScore ++;
    } 
    // results.textContent = msg;

    console.log(`Player: ${playerSelection}, ${playerScore}`);
    console.log(`Computer: ${computerSelection}, ${computerScore}`);

    let endMsg = "";
    if (playerScore == 5) {
        endMsg = `You win the game. You beat the computer ${playerScore}:${computerScore}`;
        playerScore = computerScore = 0;
    } else if (computerScore == 5) {
        endMsg = `Computer wins the game. Computer beat you ${computerScore}:${playerScore}`;
        playerScore = computerScore = 0;
    }
    // results.textContent += endMsg;
}

const buttons = document.querySelectorAll('#playerCard button');
buttons.forEach(button => button.addEventListener('click', playRound) );
