var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

function nextSequence() {
    userClickedPattern =[];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

function startGame() {
    if(gameStarted){
      window.alert("The game is already started!");
      level = currentLevel;
    }
    gameStarted = true;
    nextSequence();
    }
    
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern =[];
    gameStarted = false;
  }
  

$(document).keydown(function () {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
        $("h1").text("Level " + level);
    }
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong");
        new Audio("./sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over!!, press Start button to restart");
        $("h1").css("font-size", "1.5rem");
        startOver();
    }
}


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

$(".start-btn").click(function () {
    startGame();
});
