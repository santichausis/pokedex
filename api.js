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
        createPokemon(data);
    } catch (error) {
        console.error(error);
    }
}

// Call the pokemon
async function fetchPokemons() {
    for (let i = 1; i <= 150; i++) {
        await fetchPokemon(i)
    }

    //Filters
    filterButtons.forEach(button => {
        button.addEventListener('click', event => {
            const selectedType = event.target.dataset.type;
            const pokemonBlocks = document.querySelectorAll('.pokemon-block');
            pokemonBlocks.forEach(block => {
                block.style.display = 'none';
            });
            if (selectedType === '') {

                pokemonBlocks.forEach(block => {
                    block.style.display = 'block';
                    message.textContent = 'Any pokemon available';
                });
            } else {
                pokemonBlocks.forEach(block => {
                    const types = block.querySelectorAll('.type');
                    for (let i = 0; i < types.length; i++) {
                        if (types[i].textContent.toLowerCase() === selectedType) {
                            block.style.display = 'block';
                            break;
                        }
                    }
                });
            }
        });
    });

    const resetButton = document.querySelector('.reset-button');
    resetButton.addEventListener('click', event => {
        const pokemonBlocks = document.querySelectorAll('.pokemon-block');
        pokemonBlocks.forEach(block => {
            block.style.display = 'block';
        });
    });
}

// Create pokemon card
const createPokemon = pokemon => {
    const card = document.createElement('div')
    card.classList.add('pokemon-block')

    const spriteContainer = document.createElement('div')
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`
    sprite.alt = `This is ${pokemon.name}`
    sprite.loading = 'lazy'
    sprite.className = 'img-detail'
    spriteContainer.appendChild(sprite)

    const infoContainer = document.createElement('div')
    infoContainer.classList.add('info-container')

    const number = document.createElement('p')
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`
    number.classList.add('pokemon-number')

    const name = document.createElement('p')
    name.classList.add('name')
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    infoContainer.appendChild(name)

    const typesContainer = document.createElement('div')
    typesContainer.classList.add('types');
    infoContainer.appendChild(typesContainer);

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

    card.appendChild(number)
    card.appendChild(spriteContainer)
    card.appendChild(infoContainer)
    pokemonContainer.appendChild(card)
}

fetchPokemons()