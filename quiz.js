  window.onload = sendApiRequest
  
  // An asynchronous function to fetch data from the API
  async function sendApiRequest() {
    let response = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple`);
    console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
  }
  
  // function to process the data received from the API
  function useApiData (data) {
  document.querySelector("#category").innerHTML = `Category: ${data.results[0].category}`
  document.querySelector("#difficulty").innerHTML = `Difficulty: ${data.results[0].difficulty}`
  document.querySelector("#question").innerHTML = `Question: ${data.results[0].question}`
  document.querySelector("#answer1").innerHTML = data.results[0].correct_answer
  document.querySelector("#answer2").innerHTML = data.results[0].incorrect_answers[0]
  document.querySelector("#answer3").innerHTML = data.results[0].incorrect_answers[1]
  document.querySelector("#answer4").innerHTML = data.results[0].incorrect_answers[2]
  }

  //function for correct answer

  let correctButton = document.querySelector("#answer1")

  correctButton.addEventListener("click", () => {
    alert("You got it right!")
    sendApiRequest()
  })

  //funcion for incorrect answer
  
  let incorrectButton = document.querySelector("#answer2")

  incorrectButton.addEventListener("click", () => {
    alert("Wrong Answer!")
    sendApiRequest()
  })
  