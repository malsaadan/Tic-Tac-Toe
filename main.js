console.log('It works!!!');

/* 
    TODO: index.html
    TODO: lobby.html
    TODO: game.html
*/

// ** index.html section ** 
const checkNumPlayers = function () {
    // Check value of number of players input
    const numPlayers = $('#num-players').val();
    // if num of players equals 1 >> redirect to one player lobby , else redirect to two players lobby
    (numPlayers === '1') ? directTo1PlayerLobby(): directTo2PlayersLobby();
}

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

// Event listener on num of players button
$('#players-button').click(checkNumPlayers);
// ** end of index.html section **



// ** start of lobby.html section ** 
// get location of current page
const getPlayersInfo = function () {
    let loc = window.location.pathname;
    loc = loc.substr(loc.lastIndexOf('/') + 1);
    if (loc === 'onePlayerLobby.html') {
        const playerInput = $('#player');
        const player = playerInput.val();

        console.log(player)
    } else if (loc === 'twoPlayersLobby.html') {
        const playerOne = $('#player-one').val();
        const playerTwo = $('#player-two').val();
        console.log(playerOne, playerTwo);
    }

    // redirect to game page
    window.location.href = 'game.html';

}
$('#play-game').click(getPlayersInfo);
// ** end of lobby.html section **




// ** start of game.html section **
let playerMov = [
    [],
    []
]
// ** How to play button **
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
        modal.css('display', 'none');
    }
};
// ** end of How to play section **



// ** start of board logic
let flag = true;
let count = 0;
const playTurn = function () {
    const turn = $('#turn');

    if ($(this).text() === '') {
        if (flag) {
            $(this).text('X');
            turn.text("Player 2's turn");
            flag = false;
            $(this).css('cursor', 'default');
            playerMov[0].push(this.id);
            console.log(playerMov[0].length);
            if (playerMov[0].length >= 3)
                checkWinner();
                count++;
        } else {
            $(this).text('O');
            turn.text("Player 1's turn");
            flag = true;
            $(this).css('cursor', 'default');
            playerMov[1].push(this.id);
            console.log(playerMov[1].length);
            if (playerMov[1].length >= 3)
                checkWinner();
                count++;
        }
    } 
    if(count === 9)
    tieGame();
};

const board = $('#board > div');
for (let i = 0; i < board.length; i++) {
    const block = board[i].id;
    $('#' + block).click(playTurn);
}
// ** end of board logic **


// ** winner logic **
const checkWinner = function () {
    const score = $('#score');
    const modal = $('.modal');
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

    for (let i = 0; i < 8; i++) {
        if (playerMov[0].includes(winner[i][0]) &&
            playerMov[0].includes(winner[i][1]) &&
            playerMov[0].includes(winner[i][2])) {
            modal.css('display', 'block');
            score.text('Player 1 wins');

        } else if (playerMov[1].includes(winner[i][0]) &&
            playerMov[1].includes(winner[i][1]) &&
            playerMov[1].includes(winner[i][2])) {
            modal.css('display', 'block');
            score.text('Player 2 wins');
        }
    }
}


const tieGame = function () {
    const modal = $('.modal');
    const score = $('#score');
    score.text('Tie Game');
    modal.css('display', 'block');

}


const playAgain = function() {
    console.log('play again function')
    const modal = $('.modal');
    playerMov = [[],[]];
    resetBoard();
    modal.css('display', 'none');
}


const resetBoard = function() {
    const board = $('#board>div');
    for(let i = 0; i < board.length; i++){
    const block = '#'+board[i].id;
    $(block).text('');
    $(block).css('cursor', 'pointer');
    count = 0;
    flag = true;
    }
}

$('.again').click(playAgain);

// ** 

// ** end of game.html section**