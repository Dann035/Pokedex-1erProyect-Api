

const listPokemon = document.querySelector('#pokemon-list');
const URL = 'https://pokeapi.co/api/v2/pokemon/';
const typeURL = 'https://pokeapi.co/api/v2/type/';

for(let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((res) => res.json())
        .then(data => showPokemon(data));
}

function showPokemon(data) {
    const poke = document.createElement('div');
    const typeData = data.types;
    const types = [];


    for(e in typeData) {
        const type = typeData[e].type.name;
        types.push(type);
    }
    

    
    
    poke.classList.add('pokemon');
    poke.innerHTML = `
        <p class="pokemon-id-back">${data.id}</p>
        <div class="pokemon-image">
            <img src=${data.sprites.other['official-artwork'].front_default} alt="Pikachu">
        </div>
        <div class="pokemon-info">
            <div class="nombre-id-contenedor">
                <p class="pokemon-id">${data.id}</p>
                <h2 class="pokemon-name">${data.name}</h2>
            </div>
            <div class="type-pokemon">
                ${types.map(type => `<p class = "${type} type">${type}</p>`).join('')}
            </div>
            <div class="stats-pokemon">
                <p class="stat">${data.height}m</p>
                <p class="stat">${data.weight} Kg</p>
            </div>
        </div>
    `;
    
    listPokemon.appendChild(poke);
}