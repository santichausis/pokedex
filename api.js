const pokemonContainer = document.querySelector('.pokemon-container')
const filterButtons = document.querySelectorAll('.filter-button');
const message = document.querySelector('.message');

// Call the API
async function fetchPokemon(id) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if (!res.ok) {
            throw new Error(`Error fetching Pokemon with id ${id}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Call the pokemon
async function fetchPokemons() {
    try {
        const promises = Array.from({ length: 10 }, (_, i) => fetchPokemon(i + 1));
        const pokemonData = await Promise.all(promises);
        pokemonData.forEach(createPokemon);
    } catch (error) {
        console.error(error);
    }
}

//Filters
let visiblePokemon = 0;

filterButtons.forEach(button => {
    button.addEventListener('click', event => {
        const selectedType = event.target.dataset.type;
        const pokemonBlocks = document.querySelectorAll('.pokemon-block');
        visiblePokemon = 0;
        if (selectedType === '') {
            pokemonBlocks.forEach(block => {
                block.style.display = 'block';
                visiblePokemon++;
            });
        } else {
            pokemonBlocks.forEach(block => {
                const types = block.querySelectorAll('.type');
                const isCorrectType = Array.from(types).some(type => type.textContent.toLowerCase() === selectedType);
                if (isCorrectType) {
                    block.style.display = 'block';
                    visiblePokemon++;
                } else {
                    block.style.display = 'none';
                }
            });
        }
        if (visiblePokemon === 0) {
            message.textContent = 'Any pokemon available';
        } else {
            message.textContent = '';
        }
    });
});


// Create pokemon card
const createPokemon = pokemon => {
    const card = document.createElement('div')
    card.classList.add('pokemon-block')

    const types = pokemon.types.map(type => `
        <span class="type type-${type.type.name}">${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>
    `).join(" ");

    const html = `
        <div class="img-container">
            <img src="https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg" alt="This is ${pokemon.name}" loading="lazy" class="img-detail">
        </div>
        <div class="info-container">
            <p class="pokemon-number">#${pokemon.id.toString().padStart(3, 0)}</p>
            <p class="name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            <div class="types">
                ${types}
            </div>
        </div>
    `
    card.innerHTML = html;
    pokemonContainer.appendChild(card);
};

fetchPokemons()