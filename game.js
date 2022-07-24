
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;

$(".btn").click(function(event) {
  handlerFunction(event.target.id);
  playSound(event.target.id);
  animatePress(event.target.id);
  checkAnswer(userClickedPattern.length-1);
})

$("body").keypress(function () {
  if (gameStart === false){
    gameStart = true;
    $("h1").text("Level 0");
    nextSequence();
  }

})

function nextSequence(){
  userClickedPattern = [];
  level+=1;
  console.log(level);
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColor = buttonColours[randomNumber]

  gamePattern.push(randomChosenColor);

  // $("#"+randomChosenColor).click(function() {
  //
  //   $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  //   playSound(randomChosenColor);
  //
  // });
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  //playSound(randomChosenColor);
}


function handlerFunction(newColor){

  var userChosenColour = newColor;
  userClickedPattern.push(userChosenColour);
}

function playSound(newColor){
  var audio = new Audio("sounds/"+newColor+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout( function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      if (level === userClickedPattern.length){
        setTimeout( function () {
            nextSequence();
        }, 1000);
    }
  }else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart")
    setTimeout( function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStart = false;
}
