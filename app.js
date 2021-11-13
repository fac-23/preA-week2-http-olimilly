//set score to 0
let score = 0;
const loader = document.querySelector(".loader");
const music = document.getElementById("battleSound");

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
  document.querySelector("#answer1").innerHTML = data.results[0].correct_answer;
  document.querySelector("#answer2").innerHTML =
    data.results[0].incorrect_answers[0];
  document.querySelector("#answer3").innerHTML =
    data.results[0].incorrect_answers[1];
  document.querySelector("#answer4").innerHTML =
    data.results[0].incorrect_answers[2];
}

//function for correct answer

let correctButton = document.querySelector("#answer1");
music.play();

correctButton.addEventListener("click", () => {
  console.log("Correct!");
  sendApiRequest();
  //update score on correct answer
  score++;
  document.querySelector("#score").innerHTML = score;
  if (score % 3 === 0) {
    setPrize();
  }
});

//function for random correct answer

let randomChoice = document.querySelector(".correct");

randomChoice.addEventListener("click", () => {
  let arr = Array.from(randomChoice);
  console.log("Wrong!");
  sendApiRequest();
});

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
