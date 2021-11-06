    /* Using API URL generator on Open Trivia DataBase website, it fetched 25 questions,
    with a combination of easy, medium and difficult levels, for all categories,
    and has shown up in Google Chrome as retrieved JSON in the browser console */


    const getQuestions = fetch("https://opentdb.com/api.php?amount=25")
    .then((response) => response.json())
    .then((data) => console.log(data)); 
    
    const level = document.querySelector(".level");

    function click() {

    level.addEventListener('click', (e) => {
      e.getQuestions();
    });
  }