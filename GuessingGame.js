function generateWinningNumber() {
  var num = Math.floor(Math.random() * 100 + 1);
  if (num === 0) {
    return 1;
  } else {
    return num;
  }
}

function shuffle(array) {
  var length = array.length, j, i;

  // while there's remaining elements to shuffle
  while (length) {
    // pick a random element
    i = Math.floor(Math.random() * length--);

    // swap with the current element
    j = array[length];
    array[length] = array[i];
    array[i] = j;
  }
  // ANOTHER SOLUTION
  // for(var i = arr.length-1; i > 0; i--) {
  //      var randomIndex = Math.floor(Math.random() * (i + 1));
  //      var temp = arr[i];
  //      arr[i] = arr[randomIndex];
  //      arr[randomIndex] = temp;
  //   }

  return array;
}

function Game() {
  // hold player's number guess
  this.playersGuess = null;
  // an array which holds all the past guesses
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

// Math.abs(x) returns the absolute value of x
Game.prototype.difference = function() {
  return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function() {
  if (this.playersGuess < this.winningNumber) {
    return true;
  } else {
    return false;
  }
  // return this.playersGuess < this.winningNumber will evaluate true
}

Game.prototype.playersGuessSubmission = function(number) {
  this.playersGuess = number;
  if (number < 1 || number > 100 || typeof number !== 'number') {
    throw "That is an invalid guess.";
  }
  // I had return checkGuess();
  return this.checkGuess();
}

Game.prototype.checkGuess = function() {
  if (this.playersGuess === this.winningNumber) {
    // get the value of a property for 'disabled'
    $('#hint, #submit').prop("disabled", true);
    $('#subtitle').text('Press the Reset Button to play again!');
    return 'You Win!';
  }
  else {
    if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
      return 'You have already guessed that number.';
    }
    else {
      this.pastGuesses.push(this.playersGuess);
      // ??????
      $('#guess-list li:nth-child(' + this.pastGuesses.lenth + ')').text(this.playersGuess);
      if (this.pastGuesses.length === 5) {
        $('#hint, #submit').prop("disabled", true);
        $('#subtitle').text('Press the Reset Button to play again!')
        return 'You Lose.';
    }
    else {
      var diff = this.difference();
      if (this.isLower()) {
        $('#subtitle').text('Guess Higher!');
      } else {
        $('#subtitle').text('Guess Lower!');
      }


      if (diff < 10) {
        return "You're burning up!";
      } else if (diff < 25) {
        return "You're lukewarm.";
      } else if (diff < 50) {
        return "You're a bit chilly.";
      } else if (diff < 100) {
        return "You're ice cold!";
      }
}
// this describe was under methods of constructor prototype, I used Game.prototype.newGame
function newGame() {
  return new Game;
}

Game.prototype.provideHint = function() {
  // I could have assigned newArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()]
  var newArray = [];
  newArray.push(this.winningNumber);
  for (var i = 0; i < 2; i++) {
    newArray.push(generateWinningNumber());
  }
  return shuffle(newArray);
}

function makeAGuess(game) {
  // when submit button pressed, extract value from #player-input
  var guess = $('#player-input').val();
  // clear input
  $('#player-input').val('');
  // pass value into playersGuessSubmission and log output
// 10?????
  var output = game.playersGuessSubmission(parsInt(guess, 10));
  // log title with output
  $('#title').text(output);
}

$(document).ready(function() {

  // make a new game instance
  var game = new Game();

  // click submit button
  $('#submit').click(function(e) {
    makeAGuess(game);
  });

  // click enter button
  $('#player-input').keypress(function(event) {
    if (event.which == 13) {
      makeAGuess(game);
    }
  });
});

// when reset button is presse, create new game instance
$('#reset').click(function() {
  game = newGame();
  // reset #title and #subtitle and .guess list elements to default values
  $('#title').text('Play the Guessing Game!');
  $('#subtitle').text('Guess a number between 1-100!');
  $('.guess').text('-');
  // ??
  $('#hint, #submit').prop("disabled", false);
})
