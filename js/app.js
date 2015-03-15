
$(document).ready(function(){
	newGame();
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
        //New Game
        $(".new").click(function(){
            newGame();  
        });   
});
function newGame(){
    $("ul#guessList").children().remove();
    $("span#count").text(0);
    secretNumber = generateNumber();
    $("#userGuess").val(""); 
    previousGuess = 101;
    $("#feedback").text("Make your Guess!").css("background","#cc324b");
};

function generateNumber(){
    return Math.floor((Math.random() * 100) + 1);
};
function feedback(answer){
    var guess = $("#userGuess").val();
    if (isInt(guess)){
        incorrect = difference(guess, answer, previousGuess);
        if (incorrect){
            count();
            record(guess);
            previousGuess = guess;
        }
    }
    else {
        alert('Please enter and integer between 0 and 100');
    };
};
//set range of hot vs cold
function difference(guess, answer, previousGuess){
    incorrect = true;
    if (+guess===answer){
            incorrect = false;
            if (confirm('Correct! \nDo you want to play again?')) {
                newGame();
            }
        }
    if(previousGuess===101){
        if (+guess>answer){
            $("#feedback").text("Too High").css("background","#cc324b");
        }
        else {
            $("#feedback").text("Too Low").css("background","blue");
        }
    }
    else {
        if(Math.abs(guess-answer)>Math.abs(previousGuess-answer)){
            $("#feedback").text("Colder").css("background","blue");
        }
        else{
            $("#feedback").text("Warmer").css("background","#cc324b");
        }
    }
    return incorrect;   
}
function count(){
    var temp = $("span#count").text();
    $("span#count").text(+$("span#count").text()+1); 
}
//show the guesses already made
function record(guess){
    var tempColor = $("#feedback").css("background-color");
    $("ul#guessList").append("<li>"+guess+"</li>");
    $("ul#guessList").children().last().css("background",tempColor);
}
function isInt(n){
    if(n<=100 && n>=0){
        return n % 1 === 0; 
    }
    else{return false;}
}