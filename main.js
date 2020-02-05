console.log('It works!!!');

/* 
    TODO: index.html
    TODO: lobby.html
    TODO: game.html
*/


// ** index.html section ** 
const directTo1PlayerLobby = function () {
    window.location.href = 'onePlayerLobby.html';
}

const directTo2PlayersLobby = function () {
    window.location.href = 'twoPlayersLobby.html';
}

const directToMainPage = function () {
    window.location.href = 'index.html';
}

// Event listener on num of players button
$('#single').click(directTo1PlayerLobby);
$('#multi').click(directTo2PlayersLobby);
// ** end of index.html section **


// ** global **
let players = [];
let match = [];

/* document.addEventListener('DOMContentLoaded', (event) => {
    const audio = document.querySelector('#music');
    audio.playAgain();
  }); */


const playAudio = function () {
    const audio = $('audio');
    audio.muted = false;
}

$('#muted').click(playAudio());

$('#back').click(directToMainPage);


// ** How to play button **
// show instructions when clicking on button
const modal = $('.how-modal');
// when user press how to play button
$('#how').click(function () {
    modal.css('display', 'block');
});

// when user press close button
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
// ** end of How to play section **



// ** start of lobby.html section ** 

const getPlayerOne = function () {
    const playerInput = $('#player-one');
    const playerOneName = playerInput.val().trim();
    return playerOneName;
}

const getPlayerTwo = function () {
    const playerTwoInput = $('#player-two');
    const playerTwoName = playerTwoInput.val().trim();
    return playerTwoName;
}

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

const redirectToGamePage = function (p1, p2) {
    window.location.href = 'game.html?p1=' + p1 + '&p2=' + p2;
}


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
// ** end of lobby.html section **




// ** start of game.html section **
// Display names & wins
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
let flag = true;
let win = false;
let matchCont = true;
// counter to count no. of steps and end the game when reaching 9
let count = 0;

const board = $('#board > div');

const playerStep = function (block, num) {
    $('#turn').text('current player: ' + match[num].name);

    if (!playerMov[0].includes(block) && !playerMov[1].includes(block)) {
        // change value of the flag to switch to second player
        if (num === 0) {
            $('#' + block).append('<img src="imgs/x.png">');
            flag = false;
        } else {
            $('#' + block).append('<img src="imgs/o.png">');
            flag = true;
        }

        // append the id to movement array
        playerMov[num].push(block);
        // increment counter to end game when all blocks are filled = reaching 9
        count++;
    

    // if player 1 plays 3 steps
    if (playerMov[num].length >= 3)
        // check if player wins
        if (checkWinner())
            return;

    // when all blocks are filled >> end the game with tie
    if (count === 9) {
        tieGame();
        return;
    }


    if (match[1].name === 'AI') {
        console.log(board.length);
        for (let i = 0; i < board.length; i++) {
            const block = board[i].id;
            $('#'+block).unbind();
        }
        const boardHover = $('#board>div:hover');
        $('#turn').text('current player: ' + match[1].name);
        setTimeout(aiStep, 2000);
        clearTimeout();
        if (count === 9) {
            tieGame();
            return;
        }

        for (let i = 0; i < board.length; i++) {
            const block = board[i].id;
            if (!playerMov[0].includes(block) && !(playerMov[1].includes(block)))
                $('#' + block).click(playTurn);
        }
    }
}
}
const aiStep = function () {
    if (matchCont) {
        let counter = 0;
        const random = Math.floor(Math.random() * 9) + 1
        const randomBlock = 'block-' + random;

        if (!playerMov[0].includes(randomBlock) && !playerMov[1].includes(randomBlock)) {
            $('#' + randomBlock).append('<img src="imgs/o.png">');
            playerMov[1].push(randomBlock);
            flag = true;
            // increment counter to end game when all blocks are filled = reaching 9
            count++;
            $('#' + randomBlock).css('cursor', 'default');
            $('#' + randomBlock).css('background', '#EDEEEE');
            counter++;
            console.log(counter);
            $('#turn').text('current player: ' + match[0].name);
            if (playerMov[1].length >= 3)
                // check if player wins
                if (checkWinner())
                    return;

        } else {
            aiStep();
        }
    }
    return
}


const playTurn = function () {
    matchCont = true;
    const block = this.id;

    // if current div doesn't contain any child element
    if ($(block).children().length === 0) {
        // true means it's player 1 turn
        if (flag) {
            playerStep(block, 0);
            // player 2 turn >> same logic as player 1 
        } else {
            playerStep(block, 1);

        }

        // after player finish his turn > change cursor for current block to default
        // remove hover background on current block
        $('#' + block).css('cursor', 'default');
        $('#' + block).css('background', '#EDEEEE');
    }

};


// Attach events
for (let i = 0; i < board.length; i++) {
    const block = board[i].id;
    $('#' + block).click(playTurn);
}




// ** winner logic **
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
            modal.css('display', 'block');
            score.text(match[0].name + ' wins');
            match[0].wins += 1;
            match[1].losses += 1;
            win = true;

        } else if (playerMov[1].includes(winner[i][0]) &&
            playerMov[1].includes(winner[i][1]) &&
            playerMov[1].includes(winner[i][2])) {
            modal.css('display', 'block');
            score.text(match[1].name + ' wins');
            match[1].wins += 1;
            match[0].losses += 1;
            win = true;
        }
    }

    return win;
}


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
    playerMov = [
        [],
        []
    ];
    resetBoard();
    modal.css('display', 'none');
    displayInfo();
}



const resetBoard = function () {
    const board = $('#board>div');
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
    flag = true;
    win = false;
    matchCont = false;
}



$('.again').click(playAgain);
$('.confirm').click(directToMainPage);

// ** end of game.html section**