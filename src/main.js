const listPokemon = document.querySelector("#pokemon-list");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const typeURL = "https://pokeapi.co/api/v2/type/";

async function fetchPokemon() {
    const batchSize = 100;
    for (let i = 1; i <= 1304; i += batchSize) {
        const promises = [];
        for (let j = i; j < i + batchSize && j <= 1304; j++) {
            promises.push(fetch(URL + j).then(res => res.json()));
        }
        const batchData = await Promise.all(promises);
        batchData.forEach((data) => showPokemon(data));
    }
}

function showPokemon(data) {
    const poke = document.createElement("div");
    const types = data.types.map((typeInfo) => typeInfo.type.name);

    poke.classList.add("pokemon");
    poke.innerHTML = `
        <p class="pokemon-id-back">${data.id}</p>
        <div class="pokemon-image">
            <img src=${
                data.sprites.other["official-artwork"].front_default
            } alt="${data.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-id-contenedor">
                <p class="pokemon-id">${data.id}</p>
                <h2 class="pokemon-name">${data.name}</h2>
            </div>
            <div class="type-pokemon">
                ${types.map((type) => `<p class = "${type} type">${type}</p>`).join("")}
            </div>
            <div class="stats-pokemon">
                <p class="stat">${data.height}m</p>
                <p class="stat">${data.weight} Kg</p>
            </div>
        </div>
    `;

    listPokemon.appendChild(poke);
}

fetchPokemon();
