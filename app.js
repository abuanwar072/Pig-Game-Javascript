/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scroes, roundScroe, activePlayer, gamePlaying;
init();

function init() {
    scroes = [0, 0];
    roundScroe = 0;
    activePlayer = 0;


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('name-0').textContent = 'Player 1';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying = true;
}

// Working on load the dice
function roll() {
    if (gamePlaying) {
        // Random Number
        let dice = Math.floor(Math.random() * 6) + 1;

        // Display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        dice_value = [0, 0];

        // Update the round score 
        if (dice !== 1) {
            // update the score
            roundScroe += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScroe;
        }
        else {
            // // Go to next player
            nextPlayer();
        }
    }

}

// Function for hold
function hold() {
    if (gamePlaying) {
        // Add the score 
        scroes[activePlayer] += roundScroe;
        // update the UI
        document.getElementById('score-' + activePlayer).textContent = scroes[activePlayer];
        // check is the player won
        if (scroes[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            // go to next player
            nextPlayer();
        }
    }

}

function nextPlayer() {
    // Go to next player
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    roundScroe = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Make the player active
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.querySelector('.dice').style.display = 'none';
}

// button roll
document.querySelector('.btn-roll').addEventListener('click', roll);
// hold
document.querySelector('.btn-hold').addEventListener('click', hold);
// New game
document.querySelector('.btn-new').addEventListener('click', init);