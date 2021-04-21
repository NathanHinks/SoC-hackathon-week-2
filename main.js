//DOM
const questionDisplay = document.querySelector(".question");
const questionsRemainingDisplay = document.querySelector(".questionsRemaining");
const scoreDisplay = document.querySelector(".score");
const countdownDisplay = document.querySelector(".countdownDisplay");

//variables
let countdown = 10;
let score = 0;
let questionsRemaining = 10;
let currentAnswer = undefined;

//for interval clearing
let timer;

const displayQuestionRemaining = () => questionsRemainingDisplay.innerText = `Questions Remaining: ${questionsRemaining}`;
const displayScore = () => scoreDisplay.innerText = `Score: ${score}`;

const  displayQuestion = (questionText) => {
    //remove random characters
    questionText = questionText.replace(
        /&#039|&rsquo;|&quot;|&#39;|;/g,
        ""
      );

    questionDisplay.innerText = questionText;
}


const questionTimer = () => {
    clearInterval(timer);
    countdown= 10;

    timer = setInterval(() => {
        countdown--;
        countdownDisplay.innerText = `Time Remaining: ${countdown}s`;
        
        if(countdown <= 0) {
            countdownDisplay.innerText = "OUT OF TIME!";
            
            questionsRemaining--;
            displayQuestionRemaining();
            
            score > 5 || questionsRemaining === 0 ? endGame() : getData();

            clearInterval(timer);
        }
    }, 1000);
}


const buttonClick = (button) => {
    clearInterval(timer);
    compareValue(button);

    displayQuestionRemaining();
    displayScore();

    score > 5 || questionsRemaining === 0 ? endGame() : getData();
}

const compareValue = (value) => {
    if (value === currentAnswer) score++;
    
    questionsRemaining--;
}

const endGame = () => {
    score > 5 ? alert("you win") : alert("you lose");

    buttonTrue.classList.add("hidden")
    buttonFalse.classList.add("hidden")
    playAgain.classList.remove("hidden");
}

const resetGame = () => {
    score = 0;
    questionsRemaining = 10;
    displayQuestionRemaining();
    displayScore();
    
    buttonTrue.classList.remove("hidden")
    buttonFalse.classList.remove("hidden")
    playAgain.classList.add("hidden");

    getData();
}


//fetch
async function getData(){
    let response =  await fetch("https://opentdb.com/api.php?amount=1&category=9&type=boolean");
    let data = await response.json();
    
    currentAnswer = data.results[0].correct_answer;
    displayQuestion(data.results[0].question);

    //timer
    questionTimer();
}   
getData();


const buttonTrue = document.querySelector(".btnTrue");
buttonTrue.addEventListener("click", () => buttonClick("True"));

const buttonFalse = document.querySelector(".btnFalse");
buttonFalse.addEventListener("click", () => buttonClick("False")); 

const playAgain = document.querySelector(".playAgain")
playAgain.addEventListener("click", resetGame);
