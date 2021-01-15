//get the question container
let question = document.querySelector(".question");

//variables
let score = 0;
let questionsRemaining = 10;

function displayQuestion(questionText) {
    //change the text
    question.innerText = questionText;
}


async function getData(){
    let response =  await fetch("https://opentdb.com/api.php?amount=5&type=boolean");
    let data = await response.json();
    console.log(data.results[0])

    displayQuestion(data.results[0].question)
}   

getData();


