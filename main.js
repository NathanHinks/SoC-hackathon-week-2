//DOM
const question = document.querySelector(".question");
const questionsRemainingBoard = document.querySelector(".questionsRemaining")
const scoreBoard = document.querySelector(".score")

//variables
let countdown = 10
let score = 0;
let questionsRemaining = 10;
let currentAnswer = undefined

let timer;


const  displayQuestion = (questionText) => {
    //remove random characters
    questionText = questionText.replace(
        /&#039|&rsquo;|&quot;|&#39;|;/g,
        ""
      );

    question.innerText = questionText;
}

const compareValue = (value) => {
    if (value === currentAnswer) score++
    
    questionsRemaining--
}

const endGame = () => {
    if(score > 5) alert("you win")
    else alert("you lose")
}

const resetGame = () => {
    score = 0
    questionsRemaining = 10

    questionsRemainingBoard.innerText = `Questions Remaining: ${questionsRemaining}`
    scoreBoard.innerText = `Score: ${score}`
    
    getData()
}

const buttonClick = (button) => {
    compareValue(button);

    questionsRemainingBoard.innerText = `Questions remaining= ${questionsRemaining}`
    scoreBoard.innerText = `Score= ${score}`

    getData()
    
    if(score > 5 || questionsRemaining === 0) {
        endGame()
        
        const result = confirm("Play again?")
        if (result === true) resetGame()
    }
}


//fetch
async function getData(){
    let response =  await fetch("https://opentdb.com/api.php?amount=1&category=9&type=boolean");
    let data = await response.json();
    
    currentAnswer = data.results[0].correct_answer;
    displayQuestion(data.results[0].question)
}   

//first call
getData();


const buttonTrue = document.querySelector(".btnTrue");
buttonTrue.addEventListener("click", () => buttonClick("True"))

const buttonFalse = document.querySelector(".btnFalse");
buttonFalse.addEventListener("click", () => buttonClick("False")) 



