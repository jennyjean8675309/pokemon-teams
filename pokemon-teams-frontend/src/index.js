const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
    fetchPokemonTrainers()
})

function fetchPokemonTrainers() {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(trainers => trainers.forEach (trainer => displayTrainer(trainer)))
}

function displayTrainer(trainer) {
    let trainerCard = document.createElement('div')
    trainerCard.classList.add('card')
    trainerCard.dataset.id = trainer.id

    let trainerNameTag = document.createElement('p')
    trainerNameTag.innerText = trainer.name

    let addPokemonButton = document.createElement('button')
    addPokemonButton.dataset.trainerId = trainer.id
    addPokemonButton.innerText = 'Add Pokemon'
    addPokemonButton.addEventListener('click', () => addPokemon(trainer))

    let pokemonList = document.createElement('ul')

    trainerCard.append(trainerNameTag, addPokemonButton, pokemonList)
    getMain().appendChild(trainerCard)

    trainer.pokemons.forEach (pokemon => displayPokemon(pokemon, trainer))
}

function displayPokemon(pokemon, trainer) {
    let pokemonLi = document.createElement('li')
    pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`

    let releaseButton = document.createElement('button')
    releaseButton.classList.add('release')
    releaseButton.dataset.pokemonId = pokemon.id
    releaseButton.innerText = 'Release'
    releaseButton.addEventListener('click', releasePokemon)

    pokemonLi.appendChild(releaseButton)
    let trainerList = getTrainerList(trainer.id)
    trainerList.appendChild(pokemonLi)
}

function addPokemon(trainer) {
    if (trainer.pokemons.length < 6) {
        id = trainer.id
        trainerId = {
            "trainer_id": id
        }
        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(trainerId)
        }).then(resp => resp.json())
        .then(newPokemon => {
            if (newPokemon.error) {
                alert(newPokemon.error)
            } else {
                displayPokemon(newPokemon, trainer)
            }    
        })     
    } else {
        alert('You can only have up to 6 pokemon on your team')
    }
}

function releasePokemon(event) {
    pokemonId = event.target.dataset.pokemonId
    trainerId = event.target.parentElement.parentElement.parentElement.dataset.id
    
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: 'DELETE'
    }).then(resp => resp.json())
    .then(pokemon => {
        console.log(pokemon)
        removeFromDOM(pokemon, trainerId)
    })
}

function removeFromDOM(pokemon, trainerId) {
    let trainerList = getTrainerList(trainerId)
    let pokemonLi = document.querySelector(`[data-pokemon-id='${pokemon.id}']`).parentElement
    trainerList.removeChild(pokemonLi)
}

/////////////////////////// Functions to Retrieve Nodes ////////////////////////////

function getMain() {
    return document.querySelector('main')
}

function getTrainerList(trainerId) {
    return document.querySelector(`[data-id='${trainerId}']`).querySelector('ul')
}