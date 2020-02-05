/* let playerMov = [
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
            turn.text('current player: ' + match[0].name);
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
            if(match[1].name === 'AI'){
                aiTurn();
            }else{
                $(this).append('<img src="imgs/circle.png">');
                turn.text('current player: ' + match[1].name);
                playerMov[1].push(this.id);
            }

            flag = true;
            console.log(playerMov[1].length);
            if (playerMov[1].length >= 3)
                checkWinner();
            count++;
        }

        // after player finish his turn > change cursor for current block to default
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
            score.text(match[0].name + ' wins');
            match[0].wins += 1;
            match[1].losses += 1;

        } else if (playerMov[1].includes(winner[i][0]) &&
            playerMov[1].includes(winner[i][1]) &&
            playerMov[1].includes(winner[i][2])) {
            modal.css('display', 'block');
            score.text(match[1].name + ' wins');
            match[1].wins += 1;
            match[0].losses += 1;
        }
    }

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

const playerOneTurn = function() {
    $(this).append('<img src="imgs/xx.png">');
    turn.text('current player: ' + match[0].name);
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
}


$('.again').click(playAgain);
$('.confirm').click(directToMainPage);

// ** 


// ** AI function **
const aiTurn = function () {
    let randomBlock = Math.floor(Math.random() * 9) + 1;
    randomBlock = 'block-'+randomBlock;

    if(playerMov.includes(randomBlock))
    easyPlay();

    $('#'+randomBlock).append('<img src="imgs/circle.png">');
            $('#turn').text('current player: ' + match[1].name);
            playerMov[1].push(randomBlock);
} */









