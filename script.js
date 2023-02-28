console.log("script running");
//Variables:
let team1ScoreBox = document.querySelector(".team1");
let team2ScoreBox = document.querySelector(".team2");
let roundScoreBox = document.querySelector(".roundScore");
let guessesBox = document.querySelector(".guessesLeft");
let questionBox = document.querySelector(".questionBox");
let newQuestionButton = document.querySelector(".questionButton");
let submitButton = document.querySelector("#submitButton");
let endGameButton = document.querySelector(".endGame");

let questionBank = [
  {
    question: "Name something Alex has lost",
    answers: [
      "ID",
      "Electronics",
      "Hair",
      "backpack",
      "keys",
      "money",
      "Innocence",
    ],
    points: [6, 4, 2, 2, 2, 2, 2],
  },
  {
    question: "Name Alex's favorite food",
    answers: [
      "Rice noodles",
      "Lonely God",
      "Potato",
      "Dumpling",
      "Korean food",
    ],
    points: [4, 4, 4, 3, 2],
  },
  {
    question: "Name Alex's favorite board game",
    answers: ["Monopoly", "Ticket to ride"],
    points: [6, 4],
  },
  {
    question: "Name Alex's favorite movie",
    answers: [
      "Harry Potter",
      "Home alone",
      "Everything Everywhere All at Once",
    ],
    points: [9, 3, 2],
  },
  {
    question: "Name Alex's favorite destination for vacation",
    answers: ["NYC", "Toronto", "Hawaii", "Airports"],
    points: [3, 2, 2, 2],
  },
  {
    question: "Name Alex's least favorite food",
    answers: ["Chicken feet", "Durian", "Fat"],
    points: [3, 2, 2],
  },
  {
    question: "Name something Alex has won",
    answers: [
      "Academic awards",
      "People's heart",
      "Funding",
      "Lottery",
      "Bowling",
      "Marathon",
    ],
    points: [6, 4, 2, 2, 2, 2],
  },
  {
    question: "Name things Alex would post on social media",
    answers: ["Goji", "Paper"],
    points: [12, 2],
  },
  {
    question: "Name airports where Alex missed (or almost missed) his flight",
    answers: ["DTW", "Changi", "LAX", "Too many"],
    points: [7, 6, 5, 3],
  },
  {
    question: "Name places where Alex ran a marathon",
    answers: [
      "Pyeongyang",
      "Singapore",
      "San Francisco",
      "Ann Arbor",
      "Detroit",
      "Peru",
      "Melbourne",
    ],
    points: [8, 6, 6, 3, 3, 3, 2],
  },
  {
    question: "Name Alex's favorite sports team",
    answers: ["Bayern", "China Ping Pong", "Michigan"],
    points: [8, 4, 3],
  },
  {
    question: "Name Alex's favorite month",
    answers: ["February", "December", "April", "June", "March"],
    points: [10, 4, 3, 2, 2],
  },
];

let team1Points = 0;
let team2Points = 0;
let roundPoints = 0;
let guessesLeft = 3;
function updateBoard() {
  team1ScoreBox.innerHTML = `Team 1 Total Score: ${team1Points}`;
  team2ScoreBox.innerHTML = `Team 2 Total Score: ${team2Points}`;
  roundScoreBox.innerHTML = `Round Score: ${roundPoints}`;
  guessesBox.innerHTML = `Guesses Left: ${guessesLeft}`;
}

let answers = document.querySelectorAll(".answer");

//function to start timer:
function countdown() {
  var seconds = 59;
  function tick() {
    var counter = document.getElementById("counter");
    seconds--;
    counter.innerHTML =
      "Time left: <br> 0:" + (seconds < 10 ? "0" : "") + String(seconds);
    if (seconds > 0) {
      setTimeout(tick, 1000);
    } else {
      document.getElementById("counter").innerHTML = "";
    }
  }
  tick();
}

//GETTING A RANDOM QUESTION CODE
let randomNum = 0;
newQuestionButton.addEventListener("click", () => {
  randomNum = Math.floor(Math.random() * 11);
  questionBox.innerHTML = questionBank[randomNum].question;
  incorrectAnswerResponse.classList.add("hidden");
  countdown();
  roundPoints = 0;
  guessesLeft = 3;
  //add hidden to classlist of all answers
  answers.forEach((answer) => {
    answer.classList.add("hidden");
  });
  updateBoard();
});

//FIELD INPUT COMPARISON AND SCORE CODE

const inputField = document.querySelector("#guess");
let incorrectAnswerResponse = document.querySelector(
  "#incorrectAnswerResponse"
);

function checkAnswer(guess) {
  for (let i = 0; i < questionBank[randomNum].answers.length; i++) {
    //correct answer
    if (
      guess ===
      questionBank[randomNum].answers[i]
        .toLowerCase()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
    ) {
      roundPoints += questionBank[randomNum].points[i];
      answers.forEach((answer) => {
        let answerNum = parseInt(answer.id);
        if (answerNum === i) {
          answer.classList.remove("hidden");
          answer.innerHTML =
            questionBank[randomNum].answers[i] +
            `<br> ${questionBank[randomNum].points[i]} points`;
        }
      });
      return true;
    }
  }
  guessesLeft--;
  updateBoard();
  return false;
}

let flag;
submitButton.addEventListener("click", (event) => {
  console.log("submitted");
  let guess = inputField.value
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");

  if (guessesLeft > 0) {
    flag = checkAnswer(guess);
  }

  if (flag === true) {
    incorrectAnswerResponse.classList.add("hidden");
  }

  if (flag === false) {
    incorrectAnswerResponse.classList.remove("hidden");
  }

  if (guessesLeft === 0) {
    alert(
      "You have ran out of guesses. Click which team you would like to add points to"
    );
  }
  updateBoard();
  inputField.value = "";
  /*
  if (guessesLeft > 0) {
    for (let i = 0; i < questionBank[randomNum].answers.length; i++) {
      //correct answer
      if (guess === questionBank[randomNum].answers[i].toLowerCase()) {
        //incorrectAnswerResponse.classList.add("hidden");
        roundPoints += questionBank[randomNum].points[i];
        guessesLeft++;
        answers.forEach((answer)=> {
          let answerNum = parseInt(answer.id);
          if(answerNum === i){
            answer.classList.remove("hidden");
            answer.innerHTML = questionBank[randomNum].answers[i];
          }
        })
      }
      //incorrect answer
      else if  (guess!== questionBank[randomNum].answers[i].toLowerCase() && i === questionBank[randomNum].answers.length - 1) {              
        guessesLeft--;
        bool = false;
      }
    }
    if(guessesLeft < 3 && bool===false){
      incorrectAnswerResponse.classList.remove("hidden");
    }
    else{
      incorrectAnswerResponse.classList.add("hidden");
    }
    updateBoard(); 
    bool=true;
    
  } 
  
  if (guessesLeft === 0) {
    alert("You have ran out of guesses. Click which team you would like to add points to");
  }
  inputField.value = "";
  */
});

//SCORE UPDATE CODE
team1ScoreBox.addEventListener("click", () => {
  team1Points += roundPoints;
  updateBoard();
});

team2ScoreBox.addEventListener("click", () => {
  team2Points += roundPoints;
  updateBoard();
});

//AUDIO
function submit() {
  const audio = new Audio();
  audio.src = "sound.mp3";
  audio.play();
}

function team() {
  const audio = new Audio();
  audio.src = "new.mp3";
  audio.play();
}

function points() {
  const audio = new Audio();
  audio.src = "points.mp3";
  audio.play();
}

var confettiShower = [];
var numConfettis = 400;
var container = document.getElementById("confetti-container");
var colors = [
  "#00FF73  ",
  "#6C4AE2",
  "#FDDA00 ",
  "#DB27DB ",
  "#FA405A ",
  "#51EFFC ",
  "#EB640A ",
];

class Confetti {
  constructor(x, y, w, h, c) {
    this.w = Math.floor(Math.random() * 15 + 5);
    this.h = this.w * 1.2;
    this.x = Math.floor(Math.random() * 100);
    this.y = Math.floor(Math.random() * 100);
    this.c = colors[Math.floor(Math.random() * colors.length)];
  }
  create() {
    var newConfetti =
      '<div class="confetti" style="bottom:' +
      this.y +
      "%; left:" +
      this.x +
      "%;width:" +
      this.w +
      "px; height:" +
      this.h +
      'px;"><div class="rotate"><div class="askew" style="background-color:' +
      this.c +
      '"></div></div></div>';
    container.innerHTML += newConfetti;
  }
}

function animateConfetti() {
  for (var i = 1; i <= numConfettis; i++) {
    var confetti = new Confetti();
    confetti.create();
  }
  var confettis = document.querySelectorAll(".confetti");
  for (var i = 0; i < confettis.length; i++) {
    var opacity = Math.random() + 0.1;
    var animated = confettis[i].animate(
      [
        { transform: "translate3d(0,0,0)", opacity: opacity },
        { transform: "translate3d(20vw,100vh,0)", opacity: 1 },
      ],
      {
        duration: Math.random() * 3000 + 3000,
        iterations: Infinity,
        delay: -(Math.random() * 5000),
      }
    );
    confettiShower.push(animated);
  }
}

endGameButton.addEventListener("click", () => {
  animateConfetti();
  if (team1Points > team2Points) {
    alert("Team 1 won!");
  } else if (team1Points < team2Points) {
    alert("Team 2 won!");
  } else if (team1Points === team2Points) {
    alert("The game is tied!");
  }
});
