// Your code here
/* Algorithm
command Json--server --watch db.json ==> "open JSON server"
use a fetch(url) to access data from json file
make the data from Json file to javascript to  enable working with it
On you refresh, set the characterInfo to first character
 add the characters to the character bar
use catch method to tack any errors and print in console
Use PATCH to reset character votes in json file to adjusted votes
create function addToCharacterBar that takes each character as a parameter 
create a <span> element for each character and input the names into it, add span to the character bar
Use  using POST method to addnew character

 */
     
 /*
  pseudocode 
  grab the form using id
const form = document.querySelector('#votes-form')
 form.addEventListener('submit', function(e))
 {
    e.preventDefault()
    convert current votes to an integer and the inputed vote to an integer
    let currentVotes = parseInt(characterVotes.textContent, 10)
    let addedVotes = parseInt(e.target.votes.value, 10)
    add the inputed vote to the current votes and input that number into the textContent
     characterVotes.textContent = (currentVotes += addedVotes)
    form.reset()
 
     const charID = characters.find(character => character.name === charName.textContent)
         console.log(charID)
        fetch(`${url}/${charID.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                votes : characterVotes.textContent
           })
       })
       .then(res => res.json())
        .then(data => characterVotes.textContent = data.votes)
    })
})*/

/*explanation
We need to create a backend Json server for the test
The test requires an application that can accept an input which is a number to one of the animals.
When you input a number in the input field in counts as a vote to the speciefied animal as the most 
beautiful animal.
The test also requires a reset button to clear all the votes to default*/
const url = 'http://localhost:3000/characters'
const characterBar = document.querySelector('#character-bar')
const characterInfo = document.querySelector('#detailed-info')
let characterVotes = document.querySelector('#vote-count')

fetch(url)
.then(res => res.json())
.then(characters => {
 const name = characterInfo.querySelector('#name')
    const image = characterInfo.querySelector('#image')
    name.textContent = characters[0].name
    image.src = characters[0].image
    characterVotes.textContent = characters[0].votes
 characters.forEach(character => addToCharacterBar(character))
})
.catch(err => console.log(err))
const form = document.querySelector('#votes-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let currentVotes = parseInt(characterVotes.textContent, 10)
    let addedVotes = parseInt(e.target.votes.value, 10)
  characterVotes.textContent = (currentVotes += addedVotes)
    form.reset()
    fetch(url)
    .then(res => res.json())
    .then(characters => {
        const charName = document.querySelector('#name')
        const charID = characters.find(character => character.name === charName.textContent)
        fetch(`${url}/${charID.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                votes : characterVotes.textContent
            })
        })
        .then(res => res.json())
        .then(data => {
            characterVotes.textContent = data.votes
            console.log(data.votes)
       })
    })
})

