let playing = false;
let score;
let action;
let timeremaining;
let correctAnswer;

document.getElementById("startreset").addEventListener("click", function () {
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
});

for (let i = 1; i < 5; i++) {
  const box = document.getElementById("box" + i);
  box.setAttribute("draggable", true);

  box.addEventListener("dragstart", function (event) {
    if (playing) {
      event.dataTransfer.setData("text", this.innerHTML);
    }
  });
}

const dropArea = document.getElementById("dropArea");

dropArea.addEventListener("dragover", function (event) {
  event.preventDefault();
});

dropArea.addEventListener("drop", function (event) {
  event.preventDefault();
  if (playing) {
    const droppedAnswer = event.dataTransfer.getData("text");
    if (droppedAnswer == correctAnswer) {
      // Increase score
      score++;
      document.getElementById("scorevalue").innerHTML = score;
      hide("wrong");
      show("correct");
      setTimeout(function () {
        hide("correct");
      }, 2000);
      generateQA();
    } else {
      // Wrong answer
      hide("correct");
      show("wrong");
      setTimeout(function () {
        hide("wrong");
      }, 2000);
    }
  }
});

// define difficulty level
let maxNumber = 10;
function setDifficulty(level) {
  const difficulty = document.getElementById("difficulty").value;
  if (difficulty === "easy") {
    maxNumber = 10;
  } else if (difficulty === "medium") {
    maxNumber = 20;
  } else if (difficulty === "hard") {
    maxNumber = 30;
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
        "<p>Game Over</p><p>Your score is " + score + "</p>";
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
  const operators = ["+", "-", "x", "÷"];
  const selectedOperator =
    operators[Math.floor(Math.random() * operators.length)];
  let x = 1 + Math.round(maxNumber * Math.random());
  let y = 1 + Math.round((x - 1) * Math.random());
  // to decide on correct answer based on operator
  switch (selectedOperator) {
    case "+":
      correctAnswer = x + y;
      break;
    case "-":
      correctAnswer = x - y;
      break;
    case "x":
      correctAnswer = x * y;
      break;
    case "÷":
      x = x * y;
      correctAnswer = x / y;
      break;
  }

  //to display question
  document.getElementById(
    "question"
  ).innerHTML = `${x} ${selectedOperator} ${y} =`;

  let correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //correct answer

  //wrong answer options
  let answers = [correctAnswer];

  for (i = 1; i < 5; i++) {
    if (i != correctPosition) {
      let wrongAnswer;
      do {
        const wrongX = 1 + Math.round(maxNumber * Math.random());
        const wrongY = 1 + Math.round(maxNumber * Math.random());
        const wrongOperator =
          operators[Math.floor(Math.random() * operators.length)]; // Random operator
        switch (wrongOperator) {
          case "+":
            wrongAnswer = wrongX + wrongY;
            break;
          case "-":
            wrongAnswer = wrongX - wrongY;
            break;
          case "x":
            wrongAnswer = wrongX * wrongY;
            break;
          case "÷":
            wrongAnswer = Math.floor((wrongX * wrongY) / wrongY);
            break;
        }
      } while (answers.indexOf(wrongAnswer) > -1); // to ensure no duplicates
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
