//set score to 0
let score = 0;
let remaining = 10;
const loader = document.querySelector(".loader");
const music = document.getElementById("battleSound");
const start = document.querySelector(".startBtn");
const instructions = document.querySelector(".instructions");
const quizSection = document.querySelector(".quiz-section");
const landingImg = document.querySelector(".landingImg");

start.addEventListener("click", () => {
  music.play();
  landingImg.src = "/images/pokedex.png";
  start.style.display = "none";

  setTimeout(() => {
    instructions.style.display = "none";
    quizSection.classList.remove("hidden");
  }, 2000);
});

window.onload = sendApiRequest;

// An asynchronous function to fetch data from the API
async function sendApiRequest() {
  loader.style.display = "block";
  let response = await fetch(
    `https://opentdb.com/api.php?amount=1&type=multiple`
  );
  let data = await response.json();
  useApiData(data);
}

// function to process the data received from the API
function useApiData(data) {
  loader.style.display = "none";
  document.querySelector(
    "#category"
  ).innerHTML = `Category: ${data.results[0].category}`;
  document.querySelector(
    "#difficulty"
  ).innerHTML = `${data.results[0].difficulty}`;
  document.querySelector(
    "#question"
  ).innerHTML = `Question: ${data.results[0].question}`;

  //set random position of correct answer
  let correctPosition = Math.floor(Math.random() * (4 - 1) + 1);

  //create array of all answers (answers 1-4)
  let positions = [1, 2, 3, 4];

  //remove the correct answer from the available options
  positions.splice(correctPosition - 1, 1);

  //iterate through remaining positions and set
  //incorrect HTML text and false data attribute

  positions.forEach((position, index) => {
    let incorrectBtn = document.querySelector(`#answer${position}`);
    incorrectBtn.innerHTML = data.results[0].incorrect_answers[index];

    incorrectBtn.setAttribute("data-correctness", "false");
    incorrectBtn.classList = "btn";
    //remove any correct/incorrect classes
  });

  //set correct HTML text and true data attribute
  let correctBtn = document.querySelector(`#answer${correctPosition}`);
  correctBtn.innerHTML = data.results[0].correct_answer;

  correctBtn.setAttribute("data-correctness", "true");
  correctBtn.classList = "btn";
  //remove any correct/incorrect classes
}

//get all buttons
let answerButton = document.querySelectorAll(".btn");

//add event listener to all buttons and
//check if data attribute is true or false when clicked
answerButton.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    let isCorrect = event.target.getAttribute("data-correctness");
    remaining--;
    document.querySelector("#remaining").innerHTML = remaining;

    if (isCorrect === "true") {
      //if data attribute is true update score,
      //and correct class is added, button turns green
      btn.classList.add("correct");
      score++;

      document.querySelector("#score").innerHTML = score;

      setPrize();
    } else if (isCorrect === "false") {
      //if data attribute is false, incorrect class added, button turns red
      btn.classList.add("incorrect");
    }

    if (remaining === 0) {
      alert("Game Over");
      quizSection.style.display = "none";
    }
    //fetch next question
    sendApiRequest();
  })
);

// -----------------------------------POKEMON API-------------------------------------------- //

const prizeImage = document.getElementById("prizeImg");
const prizeButton = document.getElementById("prizeBtn");
const prizeSound = document.getElementById("prizeSound");

//extract pokemon PNG url from random pokemon object and update img src
async function setPrizeUrl(difficulty) {
  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((response) => response.json())
    .then((data) => data.results)
    .then((pokemon) => {
      let randIndex = Math.floor(Math.random() * 20);
      let pokemonURL = pokemon[randIndex].url;
      return fetch(pokemonURL);
    })
    .then((response) => {
      response.json().then((data) => {
        switch (difficulty) {
          case "easy":
            src = data.sprites.front_default;
            appendPrize(src);
            break;
          case "medium":
            src = data.sprites.other[`official-artwork`].front_default;
            appendPrize(src);
            break;
          case "hard":
            src = data.sprites.other.dream_world.front_default;
            appendPrize(src);
            break;
        }
      });
    })
    .catch((e) => {
      console.log(
        "There has been a problem with the fetch operation: " + e.message
      );
    });
}

function setPrize() {
  prizeSound.play();
  let difficulty = document.querySelector("#difficulty").innerHTML;
  setPrizeUrl(difficulty);
}

function appendPrize(src) {
  let list = document.querySelector("#pokemonList");
  var pokeImg = document.createElement("img");
  pokeImg.setAttribute("id", "prizeImg");
  pokeImg.setAttribute("src", src);
  list.appendChild(pokeImg);
}
