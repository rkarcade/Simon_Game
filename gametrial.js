var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; //the one associatd by random number with the button color
var userClickedPattern = []; //the click sequenced made by user
var started = false;
var level = 0;


//1. detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//when click, play sound according to the button colour
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern); 
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});


function checkAnswer (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log ("success");

      if (userClickedPattern.length === gamePattern.length){  

        setTimeout (function () { 
          nextSequence();
        }, 1000);

      }

  } else {
      console.log("wrong");

      playSound("wrong");

      $("body").addClass ("game-over");
      setTimeout (function () {
        $("body").removeClass ("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver(); 

    }
}


//when keypressed, then a random number from 0-3 is assigned to any button based on random number.
function nextSequence() {

  userClickedPattern = [];   


  level++; //the level increase everytime a next Sequence starts;

  $("#level-title").text("Level " + level);// this changes as level progresses

  var randomNumber = Math.floor( Math.random () * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 

  playSound(randomChosenColour); 
};


//playSound function

function playSound (name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


function animatePress(currentColour) {
    $("#"+ currentColour).addClass ("pressed");


  setTimeout(function () {
    $("#"+ currentColour).removeClass ("pressed");
  },100);

}



function startOver() {

  // reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
