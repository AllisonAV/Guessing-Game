function generateWinningNumber() {
	return Math.trunc(Math.random()  * 100) + 1;
}

function shuffle(arr) {
  var m = arr.length, t, i;
 

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = arr[m];
   arr[m] = arr[i];
   arr[i] = t;
  }
  var testReduce =  arr.reduce(function(retStr, element, index){
  	if (index === arr.length-1) {
  		return retStr + 'or ' + element;
  	} else {
  		return  retStr + element + ', ';
  	}
  },'');
  return testReduce;

}

function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
	console.log(this.winningNumber);
}

Game.prototype.difference = function() {
	var diff = this.playersGuess - this.winningNumber;
	var retArr = [];
	

	if (diff > 0) {
		retArr.push(true);
	} else {
		retArr.push(false);
	}

	retArr.unshift(Math.abs(diff));
	//retArr[0] = difference, retArr[1] = is lower
	return retArr;
};

Game.prototype.isLower = function(diff) {
	if (diff === true) {
		return 'Guess Lower!';
	} else {
		return 'Guess Higher!';
	}	
};

Game.prototype.playersGuessSubmission = function() {	
	if (this.pastGuesses.length < 5) {
		var num = +$('#player-input').val();
		$('#player-input').val('').focus();
		if (num <= 0 || num > 100 || isNaN(num)) {
			$('#subtitle').text('That is an invalid guess.');
		} else {
			this.checkGuess(num);
		
		}
	}	
};

function changeButtons(btnOff){
		$('#hint').attr('disabled', btnOff);
		$('#submit').attr('disabled', btnOff);	
}

Game.prototype.checkGuess = function(num) {
	if (num === this.winningNumber) {
		//return 'You Win!'
		$('#subtitle').text('You Win!');
		changeButtons(true);
		$('body').css({
			'background-image': "url('fireworks.gif')"
		});
	} else if (this.pastGuesses.indexOf(num) !== -1 ) {
		$('#subtitle').text('You have already guessed that number.'); 	
	} else {
		this.pastGuesses.push(num);
		this.playersGuess = num;
		$('#guess-list li:nth-child('+this.pastGuesses.length+')').text(num);
		if (this.pastGuesses.length >=5) {
			changeButtons(true);
			$('#subtitle').text('Game Over.  Winning number was '+this.winningNumber);
		} else {

			var diff = this.difference();
			console.log(diff);
			if (diff[0] < 10) {	
			$('#subtitle').text('You\'re burning up!  '+ game.isLower(diff[1]));
			} else if (diff[0] < 25){
				$('#subtitle').text('You\'re lukewarm. ' +game.isLower(diff[1]));
			}else if (diff[0] < 50) {
				$('#subtitle').text('You\'re a bit chilly.  ' +game.isLower(diff[1]));
			}else {
			$('#subtitle').text('You\'re ice cold!  ' +game.isLower(diff[1]));
			}
		}
	}
};

function newGame() {
	$('#subtitle').text('Guess a number between 1-100');
	$('#player-input').val('').focus();
	$('#guess-list li').first().text('');
	$('#guess-list li').next().text('');
	$('.hint-boxes').css({'display' : 'none'});
	$('#hint-box1').text('');
	$('#hint-box2').text('');
	$('body').css({
	'background-image': "url('nbr background.jpg')"
		});
	changeButtons(false);
	
	return new Game();
}

Game.prototype.provideHint = function() {
	var hintArr = [];
	hintArr.push(this.winningNumber);
	hintArr.push(generateWinningNumber());
	hintArr.push(generateWinningNumber());
	$('.hint-boxes').css({
		'display' : 'block',
		'background-color': 'white',
        'border': '5px solid black' ,
        'text-shadow': '5px 4px #71F9F9'
	});
	$('#hint-box1').text('Choose the winning number :');
	$('#hint-box2').text(shuffle(hintArr));
}


// question for class.  why did the addClass and removeClass not work. 
// but using .css() did work

$(document).ready(function() {
	game = new Game();
	$('#submit').on('click', function(event){
		game.playersGuessSubmission();
	});

	$(document).keypress(function(e){
		if (e.which == 13) {
			game.playersGuessSubmission();
		}
	});

	$('#reset').on('click', function() {
		game = newGame();
	});

	$('#hint').on('click', function(){
		game.provideHint();
	
	});
});








