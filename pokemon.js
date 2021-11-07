const prizeImage = document.getElementById("prizeImg");
const prizeButton = document.getElementById("prizeBtn");

//fetch array of objects that contain URL links to detailed individual pokemon objects
async function collectPokemonArray() {
  const pokemonArr = await fetch("https://pokeapi.co/api/v2/pokemon/");
  return pokemonArr;
}

//fetch individual pokemon object from the API link
async function collectPrize(url) {
  const prize = await fetch(url);
  return prize;
}

//extract pokemon PNG url from random pokemon object and update img src
async function setPrizeUrl(collectPokemonArray, difficulty) {
  collectPokemonArray()
    .then((response) => {
      response
        .json()
        .then((data) => data.results)
        .then((data) => {
          let randIndex = Math.floor(Math.random() * 20);
          let pokemonURL = data[randIndex].url;
          collectPrize(pokemonURL).then((response) => {
            response.json().then((data) => {
              console.log(data);
              switch (difficulty) {
                case "easy":
                  prizeImage.src = data.sprites.front_default;
                  break;
                case "medium":
                  prizeImage.src =
                    data.sprites.other[`official-artwork`].front_default;
                  break;
                case "hard":
                  prizeImage.src = data.sprites.other.dream_world.front_default;
                  break;
              }
            });
          });
        });
    })
    .catch((e) => {
      console.log(
        "There has been a problem with the fetch operation: " + e.message
      );
    });
}

prizeButton.addEventListener("click", (e) => {
  let difficulty = document.querySelector(
    'input[name="difficulty"]:checked'
  ).id;

  setPrizeUrl(collectPokemonArray, difficulty);
});
