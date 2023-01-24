const pokemonContainer = document.querySelector('.pokemon-container')

async function fetchPokemon(id) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    if (!res.ok) {
            throw new Error(`Error fetching Pokemon with id ${id}`);
        }
        const data = await res.json();
        createPokemon(data);
    } catch (error) {
        console.error(error);
    }
}

async function fetchPokemons() {
    for (let i = 550; i <= 650; i++) {
        await fetchPokemon(i)
    }
}

const createPokemon = pokemon => {
    const card = document.createElement('div')
    card.classList.add('pokemon-block')

    const spriteContainer = document.createElement('div')
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`
    sprite.alt = `This is ${pokemon.name}`

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
fetchPokemons(1)

const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchPokemon);

async function searchPokemon() {
    const searchInput = document.querySelector("#search-input").value;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
    const data = await res.json();

    // Clear previous search results
    pokemonContainer.innerHTML = "";

    // Create and append the new search result
    createPokemon(data);
}
