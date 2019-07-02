class Trainer {
    constructor(trainer) {
        this.id = trainer.id
        this.name = trainer.name
        this.pokemons = trainer.pokemons
    }

    static getTrainers() {
        fetch(TRAINERS_URL)
            .then(response => response.json())
            .then(trainersArray => trainersArray.forEach( trainer => {
                let t = new Trainer(trainer)
                t.renderToDOM()
            }))
    }

    renderToDOM() {
        let main = document.querySelector('main')

        let div = document.createElement('div')
        div.dataset.id = this.id
        div.classList.add('card')

        let p = document.createElement('p')
        p.innerText = this.name
        let button = document.createElement('button')
        button.innerText = 'Add Pokemon'
        button.addEventListener('click', () => this.addPokemon(this.id))
        let ul = document.createElement('ul')

        main.appendChild(div)
        div.append(p, button, ul)

        this.pokemons.forEach(pokemon => {
            p = new Pokemon(pokemon)
            p.renderToDOM()
        }) 
    }

    addPokemon(trainerId) {
        let data = {
            "trainer_id": trainerId
        }

        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(pokemon => {
            let newPokemon = new Pokemon(pokemon)
            newPokemon.renderToDOM()
        })
    }
}