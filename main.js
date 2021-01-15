//get the question container
let question = document.querySelector(".question");

//variables
let score = 0;
let questionsRemaining = 10;
let currentAnswer = undefined

function displayQuestion(questionText) {
    //change the text
    question.innerText = questionText;
}


async function getData(){
    let response =  await fetch("https://opentdb.com/api.php?amount=5&type=boolean");
    let data = await response.json();
    // console.log(data.results[0]);
    currentAnswer = data.results[0].correct_answer;
    // console.log(currentAnswer);
    displayQuestion(data.results[0].question)
}   

getData();

//button click function. it should compara answer with getData result, increase score, new question. 

// function check text content of button === data response
// extract var with the boolean for current question 

function compareValue(value){
    if(value == currentAnswer){
        score++
    }
    
    questionsRemaining--
}

//callback function that takes in value of the button
//call the campareValue function with the value of the button as a parameter. 
//update the score display to have the new score
//questions remaining must decrease and change the display 

let questionsRemainingBoard = document.querySelector(".questionsRemaining")
let scoreBoard = document.querySelector(".score")


function buttonClick(button){
    compareValue(button);
    questionsRemainingBoard.innerText = questionsRemaining
    scoreBoard.innerText = score
    getData()
    
}

let buttonTrue = document.querySelector(".btnTrue");
buttonTrue.addEventListener("click", function(){buttonClick("True")} )

let buttonFalse = document.querySelector(".btnFalse");
buttonFalse.addEventListener("click", function() {buttonClick("False")} ) 



