const user = [
  {
    name: "Kelvin",
    surname: "Wong",
    SID: 500314,
  },
];

const questions = [
  {
    question: "以下哪種生物生活在圖中的環境?",
    imageA: "http://localhost:8000/assets/A.png",
    imageB: "http://localhost:8000/assets/B.png",
    imageC: "http://localhost:8000/assets/C.png",
    imageD: "http://localhost:8000/assets/D.png",
    correctOption: "optionD",
    image: "http://localhost:8000/assets/wood.png",
  },

  {
    question: "How many players are allowed on a soccer pitch ?",
    optionA: "10 players",
    optionB: "11 players",
    optionC: "9 players",
    optionD: "12 players",
    correctOption: "optionB",
  },

  {
    question: "Who was the first President of USA ?",
    optionA: "Donald Trump",
    optionB: "Barack Obama",
    optionC: "Abraham Lincoln",
    optionD: "George Washington",
    correctOption: "optionD",
  },

  {
    question: "30 days has ______ ?",
    optionA: "January",
    optionB: "December",
    optionC: "June",
    optionD: "August",
    correctOption: "optionC",
  },
];

let shuffledQuestions = []; //empty array to hold shuffled selected questions

function handleQuestions() {
  //function to shuffle and push questions to shuffledQuestions array
  while (shuffledQuestions.length <= 3) {
    const random = questions[Math.floor(Math.random() * questions.length)];
    if (!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random);
    }
  }
}

(function loadUserDetails() {
  // load user details to dom
  document.querySelector(".user-info-container").innerHTML =
    /*HTML*/
    `
  <span>${user[0].name} ${user[0].surname}</span><br>
  <span>(${user[0].SID})</span>
  `;
})();

let questionNumber = 1;
let playerScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

document.querySelector(".total-question-no").innerHTML = questions.length;

// function for displaying next question in the array to dom
function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = shuffledQuestions[index];
  document.getElementById("question-img").style = "";

  if (currentQuestion.image) {
    // if there is question image
    document.querySelector(".game-question-container").style.flexDirection =
      "column";
    let questionImage = document.getElementById("question-img").style;
    questionImage.background = `url("${currentQuestion.image}")`;
    questionImage.height = "120px";
    questionImage.width = "150px";
    questionImage.backgroundSize = "contain";
    questionImage.backgroundRepeat = "no-repeat";
    questionImage.marginTop = "15px";
  }

  //set game details
  document.querySelector(".question-no").innerHTML = questionNumber;
  document.getElementById("player-score").innerHTML = playerScore;
  document.getElementById("display-question").innerHTML =
    currentQuestion.question;

  if (currentQuestion.optionA) {
    document.getElementById("option-one-label").innerHTML =
      currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML =
      currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML =
      currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML =
      currentQuestion.optionD;
  } else {
    const options = document.querySelectorAll(".game-options-container span");
    for (const option of options) {
      option.style.display = "flex";
      option.style.justifyContent = "center";
      option.style.alignItems = "center";
    }

    const arr = ["A", "B", "C", "D"];

    let imageStyles = document.querySelectorAll(
      ".game-options-container span label"
    );
    for (let i = 0; i < imageStyles.length; i++) {
      imageStyles[i].style.background = `url("${
        currentQuestion[`image${arr[i]}`]
      }")`;

      console.log(imageStyles[i].style.background);
      console.log(currentQuestion[`image${arr[i]}`]);
      imageStyles[i].innerText = "";
      imageStyles[i].style.height = "90px";
      console.log(imageStyles[i].style.height);
      imageStyles[i].style.width = "120px";
      imageStyles[i].style.backgroundSize = "contain";
      imageStyles[i].style.backgroundRepeat = "no-repeat";
      imageStyles[i].style.backgroundPosition = "center";
    }
  }
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber]; //gets current Question
  const currentQuestionAnswer = currentQuestion.correctOption; //gets current Question's answer
  const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      //get's correct's radio input with correct answer
      correctOption = option.labels[0].id;
    }
  });

  //checking to make sure a radio input has been checked or an option being chosen
  if (
    options[0].checked === false &&
    options[1].checked === false &&
    options[2].checked === false &&
    options[3].checked == false
  ) {
    document.getElementById("option-modal").style.display = "flex";
  }

  //checking if checked radio button is same as answer
  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      document.getElementById(correctOption).style.backgroundColor = "green";
      playerScore++;
      indexNumber++;
      //set to delay question number till when next question loads
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id;
      document.getElementById(wrongLabelId).style.backgroundColor = "red";
      document.getElementById(correctOption).style.backgroundColor = "green";
      wrongAttempt++;
      indexNumber++;
      //set to delay question number till when next question loads
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    }
  });
}

//called when the next button is called
function handleNextQuestion() {
  checkForAnswer();
  unCheckRadioButtons();
  //delays next question displaying for a second
  setTimeout(() => {
    if (indexNumber <= 3) {
      NextQuestion(indexNumber);
    } else {
      handleEndGame();
    }
    resetOptionBackground();
  }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.background = "";
    document.getElementById(option.labels[0].id).style.height = "100%";
    document.getElementById(option.labels[0].id).style.width = "100%";
  });
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

// function for when all questions being answered
function handleEndGame() {
  let remark = null;
  let remarkColor = null;

  // condition check for player remark and remark color
  if (playerScore <= 3) {
    remark = "Bad Grades, Keep Practicing.";
    remarkColor = "red";
  } else if (playerScore >= 4 && playerScore < 7) {
    remark = "Average Grades, You can do better.";
    remarkColor = "orange";
  } else if (playerScore >= 7) {
    remark = "Excellent, Keep the good work going.";
    remarkColor = "green";
  }
  const playerGrade = (playerScore / 10) * 100;

  //hide the questions and options (jim)
  document.getElementById("user-score").innerHTML = playerScore;
  document.getElementsByClassName("modal-content-container")[0].style.height =
    "35rem";
  document.getElementsByClassName("modal-content-container")[0].style.width =
    "35rem";
  document.getElementsByClassName("game-question-container")[0].style.display =
    "none";
  document.getElementsByClassName("game-options-container")[0].style.display =
    "none";
  // document.getElementsByClassName("game-details-container")[0].style.display =
  //   "none";
  document.getElementsByClassName("foot-bar")[0].style.display = "none";

  document.getElementsByClassName(
    "modal-content-container"
  )[0].style.backgroundColor = "rgb(0, 0, 0,0)";
  //data to display to score board
  // document.getElementById("remarks").innerHTML = remark;
  // document.getElementById("remarks").style.color = remarkColor;
  // document.getElementById("grade-percentage").innerHTML = playerGrade;
  // document.getElementById("wrong-answers").innerHTML = wrongAttempt;
  // document.getElementById("right-answers").innerHTML = playerScore;
  document.getElementById("score-modal").style.display = "flex";

  //game-question-container
  //game-options-container
}

//closes score modal and resets game
function closeScoreModal() {
  questionNumber = 1;
  playerScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  shuffledQuestions = [];
  NextQuestion(indexNumber);

  //by jim
  document.getElementsByClassName("game-question-container")[0].style.display =
    "flex";
  document.getElementsByClassName("game-options-container")[0].style.display =
    "flex";
  document.getElementsByClassName("game-details-container")[0].style.display =
    "block";
  document.getElementsByClassName("modal-content-container")[0].style.height =
    "9rem";
  document.getElementsByClassName("modal-content-container")[0].style.width =
    "25rem";
  document.getElementsByClassName("foot-bar")[0].style.display = "flex";
  document.getElementById("score-modal").style.display = "none";
}

//function to close warning modal
function closeOptionModal() {
  document.getElementById("option-modal").style.display = "none";
}
