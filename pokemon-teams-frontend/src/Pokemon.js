class Pokemon {
    constructor(pokemon) {
        this.id = pokemon.id
        this.nickname = pokemon.nickname
        this.species = pokemon.species
        this.trainerId = pokemon.trainer_id
    }

    renderToDOM() {
        let list = document.querySelector(`[data-id='${this.trainerId}']`).querySelector('ul')
        
        let li = document.createElement('li')
        li.innerText = `${this.nickname} (${this.species})`
        let button = document.createElement('button')
        button.classList.add('release')
        button.innerText = 'Release'
        
        li.appendChild(button)
        list.appendChild(li)
    }
}