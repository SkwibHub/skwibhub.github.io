/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
    return Math.floor(Math.random() * 100 + 1);
}

function shuffle(array) {
    let alength = array.length;
    let last;
    let randelem;

    while (alength) {
        randelem = Math.floor(Math.random() * alength--);

        last = array[alength];
        array[alength] = array[randelem];
        array[randelem] = last;
    }

    return array;
}

function newGame() {
    return new Game;
}

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.numberOfGuesses = 0;
        this.winningNumber = generateWinningNumber();
    }

    difference() {
        return Math.abs(this.winningNumber - this.playersGuess);
    }

    isLower() {
        if (this.playersGuess < this.winningNumber) {
            return true;
        }
        return false;
    } // This never gets used. Included only to pass the testem specs.

    playersGuessSubmission(guess) {
        let numGuess = parseInt(guess);

        if (numGuess > 0 && numGuess < 101) {
            this.playersGuess = numGuess;
            let guessResult =  this.checkGuess();

            document.getElementById('input').value = ''; // OUTPUT TO HTML

            result.innerHTML = guessResult + `   FOR TESTING: Guess:  ${this.playersGuess} Win:  ${this.winningNumber}`; // OUTPUT TO HTML

            lastGuesses.innerHTML = `Prior Guesses:  ${this.pastGuesses.join(",  ")}`; // OUTPUT TO HTML

        } else {
            result.innerHTML = 'That is an invalid guess.';  // OUTPUT TO HTML
        }
    }

    checkGuess() {
        let result = '';

        if (this.playersGuess === this.winningNumber) {
            return 'You Win!';
        }

        if (this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.';
        }

        this.pastGuesses.push(this.playersGuess);
        this.numberOfGuesses++;

        if (this.numberOfGuesses >= 5) {
            return 'You Lose.';
        }

        if (this.difference() < 10) {
            return "You\'re burning up!";
        }

        if (this.difference() < 25) {
            return "You\'re lukewarm.";
        }

        if (this.difference() < 50) {
            return "You\'re a bit chilly.";
        }

        return "You\'re ice cold!";

    }

    provideHint() {
        let hintArray = [];
        hintArray.push(this.winningNumber);
        hintArray.push(generateWinningNumber());
        hintArray.push(generateWinningNumber());
        return shuffle(hintArray);
    }
}


//------------------------------------------------------------------

function playGame() {
    let game = newGame();

    const submit = document.getElementById('submit');
    const reset = document.getElementById('reset');
    const hint = document.getElementById('hint');


    submit.addEventListener('click', function () {
        guess = document.getElementById('input').value;
        game.playersGuessSubmission(guess);
    });
    
    reset.addEventListener('click', function () {
        alert('NEW GAME!');
        location.reload(); // Cheated here and just refreshed the browser instead
    }); 

    hint.addEventListener('click', function () {
        let hintArrayResult = game.provideHint();
        lastGuesses.innerHTML = `HINT-- It's One of These:  ${hintArrayResult.join(", ")}`; // OUTPUT TO HTML
    }); 
}

//----------------------------------------------- start up the game!


playGame(); // note: running this function will cause the test specs to fail