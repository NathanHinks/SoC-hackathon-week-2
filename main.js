//get the question container
let question = document.querySelector(".question");

//variables
let score = 0;
let questionsRemaining = 10;
let currentAnswer = undefined

function displayQuestion(questionText) {
    //remove random characters (thanks Liam! :D)
    questionText = questionText.replace(
        /&#039|&rsquo;|&quot;|&#39;|;/g,
        ""
      );
    question.innerText = questionText;
}


async function getData(){
    let response =  await fetch("https://opentdb.com/api.php?amount=1&category=9&type=boolean");
    let data = await response.json();
    currentAnswer = data.results[0].correct_answer;
    displayQuestion(data.results[0].question)
}   

getData();


function compareValue(value){
    if(value == currentAnswer){
        score++
    }
    questionsRemaining--
}


function endGame(){
    //check if score > 5
    if(score > 5) {
        alert("you win")
    }
    else {
        alert("you lose, you suck")
    }
}

function resetGame() {
    score = 0
    questionsRemaining = 10

    questionsRemainingBoard.innerText = `Questions remaining= ${questionsRemaining}`
    scoreBoard.innerText = `Score= ${score}`
    getData()
}

let questionsRemainingBoard = document.querySelector(".questionsRemaining")
let scoreBoard = document.querySelector(".score")


function buttonClick(button){
    document.body.style.backgroundImage= "url('https://cdn.images.express.co.uk/img/dynamic/130/590x/Easy-quiz-questions-1282929.webp?r=1610179087464')"
    compareValue(button);
    questionsRemainingBoard.innerText = `Questions remaining= ${questionsRemaining}`
    scoreBoard.innerText = `Score= ${score}`
    getData()
    
    if(score > 5 || questionsRemaining === 0) {
        endGame()
        //confirm if want to play again.
        let result = confirm("Play again?")
        if(result === true) {
            //reset game
            resetGame()
        }
    }
}

let buttonTrue = document.querySelector(".btnTrue");
buttonTrue.addEventListener("click", function(){buttonClick("True")} )

let buttonFalse = document.querySelector(".btnFalse");
buttonFalse.addEventListener("click", function() {buttonClick("False")} ) 



