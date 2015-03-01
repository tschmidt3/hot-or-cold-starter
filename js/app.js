
$(document).ready(function(){
	var secretNumber = generateNumber();
        previousGuess = 101;
        console.log(secretNumber);
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
        
        /*---Check Guessed number when enter key is hit ---*/
        $("#userGuess").keyup(function(e){
           if (e.keyCode === 13) { 
                feedback(secretNumber);
                return false; //this will stop the default event triggering 
            } 
        });
        window.onbeforeunload = function() {
            return "refreshing this page will cause the game to start over";
        };
        //New Game
        $(".new").click(function(){
            newGame();
            secretNumber = generateNumber();
            
        });
        
});


function newGame(){
    //clear guesses
    $("ul#guessList").children().remove();
    //set count to 0
    $("span#count").text(0);
    //generate new number
    
};

//named function to generate secret number between 1 and 100
function generateNumber(){
    var secretNumber = Math.floor((Math.random() * 100) + 1);
    return secretNumber;
};

//named function to provide feedback (too high, too low, or just right)
//reads in the guess and tells if it is an integer, if true passes to the set range, count, and record functions
function feedback(answer){
    //want to add functionality that does not allow reguessing
    var guess = $("#userGuess").val();
    if (isInt(guess)){
        if(previousGuess<100){
            console.log(previousGuess);
        }
        
        difference(guess, answer, previousGuess);
        //Run counting function
        count();
        //Run the record function
        record(guess);
        //Store previous guess
        previousGuess = guess;
        
        
    }
    else {
        alert('Please enter and integer');
    };
};

//set range of hot vs cold
function difference(guess, answer, previousGuess){
    
    //If first guess (previousGuess = 100 high vs low, if else do hotter vs colder
    if(previousGuess===101){
        if (+guess===answer){
        console.log("correct");
        }
        else if (+guess>answer){
            alert("too high");
        }
        else {
            console.log("too low");
        }
    }
    else {
        if(+guess===answer){
            console.log("correct");
        }
        else if(Math.abs(guess-answer)>Math.abs(previousGuess-answer)){
            console.log("colder");
        }
        else{
            console.log("warmer");
        }
    }
    
    
    
    
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