console.log('It works!!!');

/* 
    TODO: index.html
    TODO: lobby.html
    TODO: game.html
*/


// ** global **
let players = [];
// **


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
$('#back').click(directToMainPage);
$('#game-logo').click(function () {
    const modal = $('#modal');
    modal.css('display', 'block');
    $('#confirm').click(directToMainPage);
    $('#cancel').click(function () {
        modal.css('display', 'none')
    });
});

// ** end of index.html section **



// ** start of lobby.html section ** 

// get location of current page
const getPlayersInfo = function () {
    let loc = window.location.pathname;
    loc = loc.substr(loc.lastIndexOf('/') + 1);

    if (loc === 'onePlayerLobby.html') {
        const playerInput = $('#player');
        const playerName = playerInput.val().trim();

        // validate
        if (playerName) {
            console.log("I'm here before game.html")
            const player = {
                name: playerName,
                highestScore: 0, 
            };
            players.push(player);
            window.location.href = 'game.html';
            
        } else {
            $(playerInput).attr('class', 'invalid');
        }


    } else if (loc === 'twoPlayersLobby.html') {
        const playerOneInput = $('#player-one');
        const playerOneName = playerOneInput.val().trim();
        const playerTwoInput = $('#player-two');
        const playerTwoName = playerTwoInput.val().trim();

        if (playerOneName && playerTwoName) {
            window.location.href = 'game.html';

        } else {
            if (!playerOneName && !playerTwoName) {
                $(playerOneInput).attr('class', 'invalid');
                $(playerTwoInput).attr('class', 'invalid');
            } else if (!playerOneName) {
                $(playerOneInput).attr('class', 'invalid');
                $(playerTwoInput).attr('class', '');
            } else {
                $(playerOneInput).attr('class', '');
                $(playerTwoInput).attr('class', 'invalid');
            }
        }
    }

    // redirect to game page

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

    if ($(this).children().length === 0) {
        if (flag) {
            $(this).append('<img src="imgs/xx.png">');
            turn.text("Player 2's turn");
            flag = false;

            playerMov[0].push(this.id);
            console.log(playerMov[0].length);
            if (playerMov[0].length >= 3)
                checkWinner();
            count++;
        } else {
            $(this).append('<img src="imgs/circle.png">');
            turn.text("Player 1's turn");
            flag = true;
            playerMov[1].push(this.id);
            console.log(playerMov[1].length);
            if (playerMov[1].length >= 3)
                checkWinner();
            count++;
        }
        $(this).css('cursor', 'default');
        $(this).css('background', '#EDEEEE');
    }
    if (count === 9)
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


const playAgain = function () {
    console.log('play again function')
    const modal = $('.modal');
    playerMov = [
        [],
        []
    ];
    resetBoard();
    modal.css('display', 'none');
}


const resetBoard = function () {
    const board = $('#board>div');
    for (let i = 0; i < board.length; i++) {
        const block = '#' + board[i].id;
        $(block).text('');
        $(block).css('cursor', 'pointer');
        count = 0;
        flag = true;
    }
}

$('.again').click(playAgain);

// ** 


// ** get score ** 


// **


// ** AI function **
const easyPlay = function () {

}
// **
// ** end of game.html section**