async function getData(){
    let response =  await fetch("https://opentdb.com/api.php?amount=5&type=boolean");
    let data = await response.json();
    console.log(data.results[0])
}   

getData();


