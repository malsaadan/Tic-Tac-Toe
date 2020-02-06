const directTo1PlayerLobby = function () {
    window.location.href = 'onePlayerLobby.html';
}

const directTo2PlayersLobby = function () {
    window.location.href = 'twoPlayersLobby.html';
}

const directToMainPage = function () {
    window.location.href = 'index.html';
}

const redirectToGamePage = function (p1, p2) {
    window.location.href = 'game.html?p1=' + p1 + '&p2=' + p2;
}

// Event listener on num of players button
$('#single').click(directTo1PlayerLobby);
$('#multi').click(directTo2PlayersLobby);

let players = [];
let match = [];


// direct user back to main page
$('#back').click(directToMainPage);


// show how to play instructions when clicking on button
const modal = $('.how-modal');
// when user press how to play button
$('#how').click(function () {
    modal.css('display', 'block');
});

// close modal when user press close button
$('.close').click(function () {
    modal.css('display', 'none');
});

// when user press outside the box
window.onclick = function () {
    if (event.target.getAttribute('class') === 'how-modal') {
        // hide the modal
        modal.css('display', 'none');
    }
};


// get player one's info
const getPlayerOne = function () {
    const playerInput = $('#player-one');
    const playerOneName = playerInput.val().trim();
    return playerOneName;
}

// get player two's info
const getPlayerTwo = function () {
    const playerTwoInput = $('#player-two');
    const playerTwoName = playerTwoInput.val().trim();
    return playerTwoName;
}

// check input field that it's not empty
const checkPlayer = function (player, num) {
    const input = '#player-' + num;
    $(input).attr('class', '');
    if (player) {
        return true;
    }
    // set the outline color as red which indicates for errorneous
    $(input).attr('class', 'invalid');
    return false;
};

// get players info function
const sendPlayerInfo = function () {
    // get current location
    let loc = window.location.pathname;
    loc = loc.substr(loc.lastIndexOf('/') + 1);

    // if current path is for oneplayer
    if (loc === 'onePlayerLobby.html') {

        const playerOne = getPlayerOne();
        // set 2nd player as ai
        const playerTwo = 'AI';

        // validate that the input is not empty
        if (checkPlayer(playerOne, 'one'))
            redirectToGamePage(playerOne, playerTwo);

        // if current path is for multi players
    } else if (loc === 'twoPlayersLobby.html') {
        // get inputs' values
        const playerOne = getPlayerOne();
        const playerTwo = getPlayerTwo()
        let checkPlayer1 = checkPlayer(playerOne, 'one');
        let checkPlayer2 = checkPlayer(playerTwo, 'two');

        // validate from input fields
        if (checkPlayer1 && checkPlayer2)
            redirectToGamePage(playerOne, playerTwo);
    }
}

$('#play-game').click(sendPlayerInfo);


// Display names, wins, losses and ties
const displayInfo = function () {
    const one = match[0];
    const two = match[1];
    $('#turn').text('current player: ' + one.name);
    $('#p1').text(one.name);
    $('#p1-wins').text('win: ' + one.wins);
    $('#p1-losses').text('lose: ' + one.losses);
    $('#p1-ties').text('tie: ' + one.ties);
    $('#p2').text(two.name);
    $('#p2-wins').text('win: ' + two.wins);
    $('#p2-losses').text('lose: ' + two.losses);
    $('#p2-ties').text('tie ' + two.ties);
}

// get players info from the url, save & display them
const getPlayerInfo = function () {
    let loc = window.location.search;
    loc = loc.substr(loc.indexOf('?') + 1);
    const name1 = (loc.substr(loc.indexOf('=') + 1, (loc.indexOf('&') - 3)));
    const name2 = loc.substr(loc.indexOf('&') + 4);
    match.push({
        name: name1,
        wins: 0,
        losses: 0,
        ties: 0,
    });
    match.push({
        name: name2,
        wins: 0,
        losses: 0,
        ties: 0,
    });

    displayInfo();
};

$(document).ready(getPlayerInfo);


// redirect player to main page when clicking on the logo
$('#game-logo').click(function () {
    const modal = $('#modal');
    // display modal block for confirmation
    modal.css('display', 'block');
    $('.confirm').click(directToMainPage);
    $('#cancel').click(function () {
        modal.css('display', 'none')
    });
});

// array to save players' movements
let playerMov = [
    [],
    []
];

// boolean variable to switch between players
let isPlayerActive = true;
let win = false;

// counter to count no. of steps and end the game when reaching 9
let count = 0;
const board = $('#board>div');

// this function switch between players when the flag is true >> it's player one's turn, 
//flag false >> player two's turn
const playTurn = function () {
    const block = this.id;

    if (isPlayerActive) {
        // set current player's text to 1st player
        $('#turn').text('current player: ' + match[0].name);
        playerTurn(block, 0);

        // if second player is an AI
        if (match[1].name === 'AI') {
            $('#turn').text('current player: ' + match[1].name);
            // disable players from playing AI's turn
            $('.div').attr('id', 'block');
            // give the illusion that the AI is thinking
            setTimeout(aiTurn, 1000);
            clearTimeout();
            if (checkWinner())
                return;

            // when all blocks are filled >> end the game with tie
            if (count === 9) {
                tieGame();
                return;
            }
        }

        // second human player turn
    } else if (!isPlayerActive) {
        playerTurn(block, 1);
    }
}

// playing the turn
const playerTurn = function (block, num) {
    // if current block is not in either player one or two's arrays (not played yet)
    if (!playerMov[0].includes(block) && !playerMov[1].includes(block)) {
        // first player
        if (num === 0) {
            // show image
            $('#' + block).append('<img src="imgs/xx.png">');
            // set current player's text to 1st player
            $('#turn').text('current player: ' + match[1].name);
            // second player
        } else {
            // show image
            $('#' + block).append('<img src="imgs/oo.png">');
            // set current player's text to 1st player
            $('#turn').text('current player: ' + match[0].name);
        }
        // append the block to the passed player's array
        playerMov[num].push(block);
        // increase the counter that ends the game when reaching 9 for tie
        count++;

        // allow to switch to the other player
        isPlayerActive = !isPlayerActive;
        // disable the passed block for next turns
        $('#' + block).css('cursor', 'default');
        $('#' + block).css('background', '#EDEEEE');

        // check if the player has won
        if (checkWinner())
            return;

        // when all blocks are filled >> end the game with tie
        if (count === 9) {
            tieGame();
            return;
        }
    }

}

const aiTurn = function () {
    // choose a random block
    const random = Math.floor(Math.random() * 9) + 1;
    const randomBlock = 'block-' + random;
    // if the random block is not in either players' arrays
    if (!playerMov[0].includes(randomBlock) && !playerMov[1].includes(randomBlock)) {
        // show the image & disable the block for next turns
        $('#' + randomBlock).append('<img src="imgs/oo.png">');
        $('#' + randomBlock).css('cursor', 'default');
        $('#' + randomBlock).css('background', '#EDEEEE');
        // set current player's text to next player
        $('#turn').text('current player: ' + match[0].name);
        // append the block to player2's moves array
        playerMov[1].push(randomBlock);
        count++;

        // enable 1st player to play his/her turn
        $('.div').attr('id', '');
        // switch to the other player
        isPlayerActive = !isPlayerActive;

    } else {
        // if the random block exists in one of either arrays, choose another random block
        aiTurn();
    }
}

// Attach events
for (let i = 0; i < board.length; i++) {
    const block = board[i].id;
    $('#' + block).click(playTurn);
}

const checkWinner = function () {
    const score = $('#score');
    // modal to display winner name
    const modal = $('.modal');
    // array of arrays that contains all winning strategies
    const winner = [
        ['block-1', 'block-2', 'block-3'],
        ['block-4', 'block-5', 'block-6'],
        ['block-7', 'block-8', 'block-9'],
        ['block-1', 'block-4', 'block-7'],
        ['block-2', 'block-5', 'block-8'],
        ['block-3', 'block-6', 'block-9'],
        ['block-1', 'block-5', 'block-9'],
        ['block-3', 'block-5', 'block-7']
    ];

    // all the possible ways where a player can win
    for (let i = 0; i < 8; i++) {
        if (playerMov[0].includes(winner[i][0]) &&
            playerMov[0].includes(winner[i][1]) &&
            playerMov[0].includes(winner[i][2])) {
            $(modal).css('display', 'block');
            score.text(match[0].name + ' wins');
            match[0].wins += 1;
            match[1].losses += 1;
            win = true;
            return win;

        } else if (playerMov[1].includes(winner[i][0]) &&
            playerMov[1].includes(winner[i][1]) &&
            playerMov[1].includes(winner[i][2])) {
            $(modal).css('display', 'block');
            score.text(match[1].name + ' wins');
            match[1].wins += 1;
            match[0].losses += 1;
            win = true;
            return win;
        }
    }
};

// show the modal if the game is a tie
const tieGame = function () {
    const modal = $('.modal');
    const score = $('#score');
    score.text('Tie Game');
    modal.css('display', 'block');
    match[0].ties += 1;
    match[1].ties += 1;
}

// when player clicks on play again >> reset all current variables to start over
const playAgain = function () {
    const modal = $('.modal');
    playerMov[0] = [];
    playerMov[1] = [];
    resetBoard();
    modal.css('display', 'none');
    displayInfo();
}


const resetBoard = function () {
    for (let i = 0; i < board.length; i++) {
        const block = '#' + board[i].id;
        $(block).click(playTurn);
        // remove children
        $(block).text('');
        // change cursor to pointer to indicate that the block is playable
        $(block).css('cursor', 'pointer');
        // restore hover background
        $(block).css('background', '');
    }
    // reset counter for ending the game
    count = 0;
    // set player 1 as first player
    isPlayerActive = true;
    win = false;
}

$('.again').click(playAgain);
$('.confirm').click(directToMainPage);