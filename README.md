## Overview
In this project, I implemented a Tic tac toe game based on multiple user stories that were provided to me by GA.

## Used Technologies
1. HTML 
2. CSS
3. JQUERY 

## User Stories and Wireframes

### User Stories
[SEI-Entropy User Stories](https://github.com/sei-entropy/project-1-prompt#user-content-user-stories)
* As a user, I should be able to start a new tic tac toe game.
* As a user, I should be able to click on a square to add X first and then O, and so on.
* As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next.
* As a user, I should not be able to click the same square twice.
* As a user, I should be shown a message when I win, lose or tie.
* As a user, I should not be able to continue playing once I win, lose, or tie.
* As a user, I should be able to play the game again without refreshing the page.

### Wireframes
[Tic-Toc-Toe Wireframes](https://github.com/malsaadan/Tic-Tac-Toe/tree/master/wireframes)


## Future Work
* Add sound effects to the game.
* Add more logic to the AI.
* Allow players to customize their pictures and tokens.


## Development Process
I started this project by setting up the HTML files (the structure). After that, I applied a little design on them before starting with javascript. In javascript, I started breaking down the problem to two smaller problems: 
* Player versus a player
* Player versus an AI


### Winner Logic
At first, I created an array that contains the players' moves. Each time a player makes a move, I would check if he/she has won or not. The winning function checks all of the player's moves (all blocks) and iterates around an array of all the possible ways of winning and check if the player's array contains a winning array.

### Other functions
Here are some of the challenges that I faced and was fun to solve:
* Since I made a couple of HTML pages, I faced a problem which is I can't send players' information from one page to another without backend, I solved this problem by catching the information from the URL using GET which was interesting to learn.

* Another function that was similar to the above is how to restart the game, first thing came to my mind was to refresh the page but then all the information would be gone which I need to keep the scores of both player. So I solved this by emptying all the variables that are used in a single match.

* The AI function was the most challenging one and the most fun. I had to make the function to recognize whether the second player is a human or an AI, by comparing its name and executing its function. In the meanwhile, I had to block the first player so he/she wouldn't make a move while the second player (AI) is playing by displaying and hide a transparent div.