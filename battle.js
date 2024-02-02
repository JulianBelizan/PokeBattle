// Función para obtener un Pokémon aleatorio de la API
async function obtenerPokemonAleatorio() {
    const numeroAleatorio = Math.floor(Math.random() * 800) + 1;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data;
}

// Función para obtener un Pokémon en base al nombre
async function obtenerPokemonPorNombre(pokemonName) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

// Función para simular una batalla entre dos Pokémon
function simularBatalla(pokemonSeleccionado, pokemonAleatorio) {
    // Obtener un movimiento aleatorio del Pokémon seleccionado
    const movimientosSeleccionado = pokemonSeleccionado.moves.map(move => move.move.name);
    const movimientoSeleccionado = movimientosSeleccionado[Math.floor(Math.random() * movimientosSeleccionado.length)];

    // Obtener estadísticas relevantes de los Pokémon
    const saludSeleccionado = pokemonSeleccionado.stats[0].base_stat; // Salud del Pokémon seleccionado
    const ataqueSeleccionado = pokemonSeleccionado.stats[1].base_stat; // Ataque del Pokémon seleccionado
    const defensaSeleccionado = pokemonSeleccionado.stats[2].base_stat; // Defensa del Pokémon seleccionado

    console.log(ataqueSeleccionado);
    console.log(defensaSeleccionado);

    const saludAleatorio = pokemonAleatorio.stats[0].base_stat; // Salud del Pokémon aleatorio
    const ataqueAleatorio = pokemonAleatorio.stats[1].base_stat; // Ataque del Pokémon aleatorio
    const defensaAleatorio = pokemonAleatorio.stats[2].base_stat; // Defensa del Pokémon aleatorio

    console.log(ataqueAleatorio);
    console.log(defensaAleatorio);

    // Calcular el daño infligido por el Pokémon seleccionado
    const danoSeleccionado = Math.max(ataqueSeleccionado - defensaAleatorio, 0);

    // Calcular el daño infligido por el Pokémon aleatorio
    const danoAleatorio = Math.max(ataqueAleatorio - defensaSeleccionado, 0);

    // Calcular cuánta vida queda después del ataque
    const vidaRestanteSeleccionado = Math.max(saludSeleccionado - danoAleatorio, 0);
    const vidaRestanteAleatorio = Math.max(saludAleatorio - danoSeleccionado, 0);

    if (vidaRestanteSeleccionado > vidaRestanteAleatorio) {
        const pokemonSeleccionadoMayus = pokemonSeleccionado.name.charAt(0).toUpperCase() + pokemonSeleccionado.name.slice(1);
        return `<b>${pokemonSeleccionadoMayus}</b> utilizó "${movimientoSeleccionado}" y gana la batalla con ${vidaRestanteSeleccionado} de salud restante.`;
    } else if (vidaRestanteSeleccionado < vidaRestanteAleatorio) {
        const pokemonAleatorioMayus = pokemonAleatorio.name.charAt(0).toUpperCase() + pokemonAleatorio.name.slice(1);
        return `${pokemonAleatorioMayus} utilizó "${movimientoSeleccionado}" y gana la batalla con ${vidaRestanteAleatorio} de salud restante.`;
    } else {
        return 'La batalla termina en empate, ambos Pokémon están igualados en poder.';
    }
}





// Función para mostrar la información de un Pokémon en una caja
function mostrarInfoPokemonEnCaja(pokemon, cajaId) {
    const caja = document.getElementById(cajaId);
    const pokemonNameCapitalized = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    caja.innerHTML = `
        <h2>${pokemonNameCapitalized}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Nombre: ${pokemonNameCapitalized}</p>
        <p>Salud: ${pokemon.stats[0].base_stat}</p>
    `;
}

// Cuando la página se cargue
document.addEventListener('DOMContentLoaded', async function() {
    // Obtener el Pokémon seleccionado de localStorage
    const pokemonSeleccionado = JSON.parse(localStorage.getItem('pokemonSeleccionado'));

    if (!pokemonSeleccionado) {
        console.error('Pokémon seleccionado no encontrado en localStorage.');
        return;
    }

    // Obtener un Pokémon aleatorio de la API
    const pokemonAleatorio = await obtenerPokemonAleatorio();

    // Obtener el Pokémon seleccionado de la API por su nombre
    const pokemonSeleccionadoData = await obtenerPokemonPorNombre(pokemonSeleccionado.name);

    // Mostrar información de los Pokémon en las cajas correspondientes
    mostrarInfoPokemonEnCaja(pokemonAleatorio, 'pokemonAleatorioBox');
    mostrarInfoPokemonEnCaja(pokemonSeleccionadoData, 'tuPokemonBox');

    // Simular la batalla
    const resultadoBatalla = simularBatalla(pokemonSeleccionadoData, pokemonAleatorio);

    // Mostrar el resultado en la página
    const resultadoContainer = document.getElementById('resultadoBatalla');
    resultadoContainer.textContent = resultadoBatalla;
});

// Escucha el evento personalizado
document.addEventListener('seleccionPokemon', async function(event) {
    const pokemonSeleccionado = event.detail;

    // Obtener un Pokémon aleatorio de la API
    const pokemonAleatorio = await obtenerPokemonAleatorio();

    // Mostrar información de los Pokémon en las cajas correspondientes
    mostrarInfoPokemonEnCaja(pokemonAleatorio, 'pokemonAleatorioBox');
    mostrarInfoPokemonEnCaja(pokemonSeleccionado, 'tuPokemonBox');

    // Simular la batalla
    const resultadoBatalla = simularBatalla(pokemonSeleccionado, pokemonAleatorio);

    // Mostrar el resultado en la página
    const resultadoContainer = document.getElementById('resultadoBatalla');
    resultadoContainer.textContent = resultadoBatalla;
});

// Obtener el botón "Volver a Index"
const volverIndexButton = document.getElementById('volverIndex');

// Agregar un evento de clic al botón "Volver a Index"
volverIndexButton.addEventListener('click', function() {
    // Redirigir al usuario a la página "index.html"
    window.location.href = 'index.html';
});

// Obtener el botón "Pelear Nuevamente"
const pelearNuevamenteButton = document.getElementById('pelearNuevamente');

// Agregar un evento de clic al botón "Pelear Nuevamente"
pelearNuevamenteButton.addEventListener('click', async function() {
    // Obtener el Pokémon seleccionado de localStorage
    const pokemonSeleccionado = JSON.parse(localStorage.getItem('pokemonSeleccionado'));

    if (!pokemonSeleccionado) {
        console.error('Pokémon seleccionado no encontrado en localStorage.');
        return;
    }

    // Obtener un Pokémon aleatorio de la API
    const pokemonAleatorio = await obtenerPokemonAleatorio();

    // Obtener el Pokémon seleccionado de la API por su nombre
    const pokemonSeleccionadoData = await obtenerPokemonPorNombre(pokemonSeleccionado.name);

    // Mostrar información de los Pokémon en las cajas correspondientes
    mostrarInfoPokemonEnCaja(pokemonAleatorio, 'pokemonAleatorioBox');
    mostrarInfoPokemonEnCaja(pokemonSeleccionadoData, 'tuPokemonBox');

    // Simular la batalla
    const resultadoBatalla = simularBatalla(pokemonSeleccionadoData, pokemonAleatorio);

    // Mostrar el resultado en la página
    const resultadoContainer = document.getElementById('resultadoBatalla');
    resultadoContainer.textContent = resultadoBatalla;
});
