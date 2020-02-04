console.log('It works!!!');

/* 
    TODO: index.html
    TODO: lobby.html
    TODO: game.html
*/


// ** index.html section ** 
const directTo1PlayerLobby = function () {
    console.log('1 Player Lobby');
    // redirection
    window.location.href = 'onePlayerLobby.html';
}

const directTo2PlayersLobby = function () {
    console.log('2 Players Lobby');
    // redirection
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
    console.log(input);
    if (player) {
       return true;
    }
     // set the outline color as red which indicates for errorneous
     $(input).attr('class', 'invalid');
     return false;
};

const redirectToGamePage = function(p1, p2){
    window.location.href = 'game.html?p1='+p1+'&p2='+p2;
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
        if(checkPlayer1 && checkPlayer2)
        redirectToGamePage(playerOne, playerTwo);
    }
}

$('#play-game').click(sendPlayerInfo);
// ** end of lobby.html section **




// ** start of game.html section **
// Display names & wins
const displayInfo = function() {
    const playerOne = match[0];
    const playerTwo = match[1];
    console.log(playerOne, playerTwo);
    $('#turn').text('current player: ' + playerOne.name);
    $('#p1').text(playerOne.name);
    $('#p1-wins').text('wins: '+playerOne.wins);
    $('#p2').text(playerTwo.name);
    $('#p2-wins').text('wins: '+playerTwo.wins);
}

const getPlayerInfo = function(){
let loc = window.location.search;
loc = loc.substr(loc.indexOf('?')+1);
const name1 = (loc.substr(loc.indexOf('=')+1, (loc.indexOf('&')-3)));
const name2 = loc.substr(loc.indexOf('&')+4);
console.log(name1, name2);
match.push({
    name: name1,
    wins: 0,
});
match.push({
    name: name2,
    wins: 0
});

displayInfo();
};

$(document).ready(getPlayerInfo);

// redirect player to main page when clicking on the logo
$('#game-logo').click(function () {
    const modal = $('#modal');
    // display modal block for confirmation
    modal.css('display', 'block');
    $('#confirm').click(directToMainPage);
    $('#cancel').click(function () {
        modal.css('display', 'none')
    });
});


// ** start of board logic

// array to save players' movements
let playerMov = [
    [],
    []
]

// boolean variable to switch between players
let flag = true;
// counter to count no. of steps and end the game when reaching 9
let count = 0;

// function to play a turn
const playTurn = function () {
    const turn = $('#turn');

    // if current div doesn't contain any child element
    if ($(this).children().length === 0) {
        // true means it's player 1 turn
        if (flag) {
            $(this).append('<img src="imgs/xx.png">');
            turn.text('current player: '+match[0].name);
            // change value of the flag to switch to second player
            flag = false;
            // append the id to movement array
            playerMov[0].push(this.id);
            console.log(playerMov[0].length);
            // if player 1 plays 3 steps
            if (playerMov[0].length >= 3)
                // check if player wins
                checkWinner();
            // increment counter to end game when all blocks are filled = reaching 9
            count++;
            // player 2 turn >> same logic as player 1 
        } else {
            $(this).append('<img src="imgs/circle.png">');
            turn.text('current player: '+match[1].name);
            flag = true;
            playerMov[1].push(this.id);
            console.log(playerMov[1].length);
            if (playerMov[1].length >= 3)
                checkWinner();
            count++;
        }

        // after player finish his turn > change curser for current block to default
        // remove hover background on current block
        $(this).css('cursor', 'default');
        $(this).css('background', '#EDEEEE');
    }
    // when all blocks are filled >> end the game with tie
    if (count === 9)
        tieGame();
};

// get divs' ids and attach an event listener to them
const board = $('#board > div');
for (let i = 0; i < board.length; i++) {
    const block = board[i].id;
    $('#' + block).click(playTurn);
}
// ** end of board logic **


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
            score.text(match[0].name+' wins');
            match[0].wins += 1;

        } else if (playerMov[1].includes(winner[i][0]) &&
            playerMov[1].includes(winner[i][1]) &&
            playerMov[1].includes(winner[i][2])) {
            modal.css('display', 'block');
            score.text(match[1].name+' wins');
            match[1].wins += 1;
        }
    }
}


const tieGame = function () {
    const modal = $('.modal');
    const score = $('#score');
    score.text('Tie Game');
    modal.css('display', 'block');

}

// when player clicks on play again >> reset all current variables to start over
const playAgain = function () {
    console.log('play again function')
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
        // remove children
        $(block).text('');
        // change cursor to pointer to indicate that the block is playable
        $(block).css('cursor', 'pointer');
        // restore hover background
        $(block).css('background', '')
        // reset counter for ending the game
        count = 0;
        // set player 1 as first player
        flag = true;
    }
}

$('.again').click(playAgain);

// ** 


// ** AI function **
const easyPlay = function () {
    let randomBlock = Math.floor(Math.random() * 9) + 1;

}


// ** end of game.html section**