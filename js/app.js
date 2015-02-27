
$(document).ready(function(){
	var secretNumber = generateNumber();
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
            $(".overlay").fadeIn(1000);
  	});
  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
        /*--- Check Guessed number ---*/
        $("#guessButton").click(function(){
            feedback(secretNumber);
        });

});


function newGame(){
    
};

//named function to generate secret number between 1 and 100
function generateNumber(){
    var secretNumber = Math.floor((Math.random() * 100) + 1);
    return secretNumber;

    
}


//named function to provide feedback (too high, too low, or just right)
//reads in the guess and tells if it is an integer, if true passes to the set range, count, and record functions
function feedback(answer){
    var guess = $("#userGuess").val();
    if (isInt(guess)){
        difference(guess, answer);
        //Run counting function
        //Run the record function
        record(guess);
        count();
    }
    else {
        alert('Please enter and integer');
    };
};

//set range of hot vs cold
function difference(guess, answer){
    
    
}


//track how many guesses made
function count(){
    var temp = $("span#count").text();
    $("span#count").text(+temp+1); 
}


//show the guesses already made
function record(guess){
    $("ul#guessList").append("<li>"+guess+"</li>");
}

function isInt(n){
    return n % 1 === 0;
}