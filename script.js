let playing = false;
let score;
let action;
let timeremaining;
let correctAnswer;

document.getElementById("startreset").onclick = function () {
  if (playing == true) {
    location.reload();
  } else {
    playing = true;
    score = 0;

    document.getElementById("scorevalue").innerHTML = score;
    //show countdown
    show("timeremaining");
    timeremaining = 30;

    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    //hide game over
    hide("gameOver");

    //change start to reset
    document.getElementById("startreset").innerHTML = "Reset Game";

    //to begin countdown
    startCountdown();

    //to generate question
    generateQA();
  }
};

for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    if (playing == true) {
      if (this.innerHTML == correctAnswer) {
        //increase score
        score++;
        document.getElementById("scorevalue").innerHTML = score;
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);
        generateQA();
      } else {
        //wrong answer
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    }
  };
}

let maxNumber = 10;
function setDifficulty() {
  const difficulty = document.getElementById("difficulty").value;
  if (difficulty === "easy") {
    maxNumber = 10;
  } else if (difficulty === "medium") {
    maxNumber = 30;
  } else if (difficulty === "hard") {
    maxNumber = 50;
  }
}

//timer countdown
function startCountdown() {
  action = setInterval(function () {
    timeremaining -= 1;

    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if (timeremaining == 0) {
      stopCountdown();
      show("gameOver");

      //game over
      document.getElementById("gameOver").innerHTML =
        "<p>Game over!</p><p>Your score is " + score + "</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;

      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}

//stop count
function stopCountdown() {
  clearInterval(action);
}

//hide
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

//show
function show(Id) {
  document.getElementById(Id).style.display = "block";
}
//generate question
function generateQA() {
  let x = 1 + Math.round(maxNumber * Math.random());
  let y = 1 + Math.round(maxNumber * Math.random());
  correctAnswer = x + y;

  document.getElementById("question").innerHTML = x + " + " + y;
  let correctPosition = 1 + Math.round(3 * Math.random());

  document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //correct answer

  //wrong answer options
  let answers = [correctAnswer];

  for (i = 1; i < 5; i++) {
    if (i != correctPosition) {
      let wrongAnswer;
      do {
        wrongAnswer =
          1 +
          Math.round(maxNumber * Math.random()) +
          (1 + Math.round(maxNumber * Math.random())); //wrong answer
      } while (answers.indexOf(wrongAnswer) > -1);

      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
