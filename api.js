const pokemonContainer = document.querySelector('.pokemon-container')
const cache = {};

async function fetchPokemon(id) {
    const data = JSON.parse(localStorage.getItem(`Pokemon-${id}`));
    if (data) {
        createPokemon(data);
    } else {
        try {

            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            if (!res.ok) {
                throw new Error(`Error fetching Pokemon with id ${id}`);
            }
            const data = await res.json();
            cache[id] = data;
            localStorage.setItem(`Pokemon-${id}`, JSON.stringify(data));
            createPokemon(data);
        } catch (error) {
            console.error(error);
        }
    }
}


async function fetchPokemons(number) {
    for (let i = 1; i < number; i++) {
        await fetchPokemon(i)
    }
}

const createPokemon = pokemon => {
    const card = document.createElement('div')
    card.classList.add('pokemon-block')

    const spriteContainer = document.createElement('div')
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite)

    const number = document.createElement('p')
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`

    const name = document.createElement('p')
    name.classList.add('name')
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const typesContainer = document.createElement('div')
    typesContainer.classList.add('types');
    pokemon.types.forEach((type, index) => {
        const typeElem = document.createElement('span');
        typeElem.classList.add('type');
        typeElem.classList.add(`type-${type.type.name}`);
        typeElem.textContent = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
        typesContainer.appendChild(typeElem);
        if (index !== pokemon.types.length - 1) {
            typesContainer.appendChild(document.createTextNode(' '));
        }
    });
    
    
    

    card.appendChild(spriteContainer)
    card.appendChild(number)
    card.appendChild(name)
    card.appendChild(typesContainer);

    pokemonContainer.appendChild(card)
}

fetchPokemons(40)