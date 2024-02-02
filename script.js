// Función para obtener 5 Pokémon aleatorios de la API
async function obtenerPokemonesAleatorios() {
    const pokemones = [];
    for (let i = 0; i < 10; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 800) + 1; // Genera un número aleatorio entre 1 y 800
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        
        pokemones.push(data);
    }
    return pokemones;
}

// Cuando la página se cargue
document.addEventListener('DOMContentLoaded', async function() {
    // Obtener las imágenes de los Pokémon
    const pokemonImagesContainer = document.getElementById('pokemon-images');

    // Obtener 5 Pokémon aleatorios de la API
    const pokemonesAleatorios = await obtenerPokemonesAleatorios();

    // Mostrar las imágenes de los Pokémon en la página
    pokemonesAleatorios.forEach((pokemon) => {
        const image = document.createElement('img');
        image.src = pokemon.sprites.front_default;
        image.alt = pokemon.name;
        image.classList.add('pokemon');

        image.addEventListener('click', () => {
            // Quitar la clase 'selected' de todas las imágenes
            const selectedImages = document.querySelectorAll('.pokemon.selected');
            selectedImages.forEach((img) => {
                img.classList.remove('selected');
            });
    
            // Agregar la clase 'selected' solo a la imagen que se hizo clic
            image.classList.add('selected');
    
            // Obtener el nombre del Pokémon a partir del atributo 'alt' de la imagen
            const pokemonName = image.getAttribute('alt');
    
            // Llamar a la función para mostrar la información del Pokémon
            mostrarInfoPokemon(pokemonName);
        });

        pokemonImagesContainer.appendChild(image);
    });
});

// Función para mostrar la información del Pokémon seleccionado
function mostrarInfoPokemon(pokemonName) {
    // Convertir la primera letra a mayúscula
    const pokemonNameCapitalized = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    // Resto de tu código
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const pokemonLife = data.stats[0].base_stat;
        const pokemonAttack = data.stats[1].base_stat;
        const pokemonDefense = data.stats[2].base_stat;

        // Obtener los tipos del Pokémon
        const tipos = data.types.map(type => type.type.name);

        // Crear los elementos de tipos con sus estilos
        const tiposContainer = tipos.map(tipo => {
            const tipoBox = document.createElement('span');
            tipoBox.textContent = tipo;
            tipoBox.classList.add('type-box', `type-${tipo}`);
            return tipoBox;
        });

        const pokemonInfoContainer = document.querySelector('.pokemon-info');
        pokemonInfoContainer.innerHTML = `
          <h3>${pokemonNameCapitalized}</h3>
          <img src="${data.sprites['front_default']}" alt="Imagen ${data.name}">;
          <div class="types-container">
            ${tiposContainer.map(box => box.outerHTML).join('')}
          </div>
          <p><i class="fas fa-heart"></i> HP: ${pokemonLife}</p>
          <p><i class="fas fa-fist-raised"></i> Attack: ${pokemonAttack}</p>
          <p><i class="fas fa-shield-alt"></i> Defense: ${pokemonDefense}</p>
        `;
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

// Declarar la variable pokemonSelect al comienzo del script
const pokemonSelect = document.getElementById('pokemon-list');


// Función para obtener la lista de todos los Pokémon disponibles
// Función para obtener la lista de todos los Pokémon disponibles
// Función para obtener la lista de todos los Pokémon disponibles
// Función para obtener la lista de todos los Pokémon disponibles
async function obtenerListaPokemon() {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=800'; // Cambia el límite según tus necesidades

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Obtener el select
      const pokemonSelect = document.getElementById('pokemon-list');
      const pokemonInfoContainer = document.querySelector('.pokemon-info');

      // Función para mostrar la información del Pokémon en el contenedor
      function mostrarInfoPokemon(pokemonData) {
          // Limpiar el contenedor antes de mostrar nueva información
          pokemonInfoContainer.innerHTML = `
            <h3>${pokemonData.name}</h3>
            <img src="${pokemonData.sprites['front_default']}" alt="Imagen ${pokemonData.name}">;
            <div class="types-container">
              ${pokemonData.types.map(type => {
                  return `<div class="type-box type-${type.type.name}">${type.type.name}</div>`;
              }).join('')}
            </div>
            <p><i class="fas fa-heart"></i> HP: ${pokemonData.stats[0].base_stat}</p>
            <p><i class="fas fa-fist-raised"></i> Attack: ${pokemonData.stats[1].base_stat}</p>
            <p><i class="fas fa-shield-alt"></i> Defense: ${pokemonData.stats[2].base_stat}</p>
          `;
      }
  } catch (error) {
      console.error('Error al obtener la lista de Pokémon:', error);
  }
}



// Función para obtener los datos de un Pokémon por nombre
async function obtenerPokemonPorNombre(pokemonName) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error(`Error al obtener datos de ${pokemonName}:`, error);
  }
}

function limpiarSeleccionAleatoria() {
  const selectedImages = document.querySelectorAll('.pokemon.selected');
  selectedImages.forEach((img) => {
      img.classList.remove('selected');
  });
}

// Llamar a la función para obtener la lista de Pokémon cuando la página se cargue
document.addEventListener('DOMContentLoaded', obtenerListaPokemon);

// Espera a que el documento se cargue antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
  // Obtener el botón "Iniciar Batalla"
  const startBattleButton = document.getElementById('start-battle');
  // Agregar un evento de clic al botón "Iniciar Batalla"
  startBattleButton.addEventListener('click', async function () {
    // Obtener el Pokémon seleccionado actualmente
    const selectedPokemonImage = document.querySelector('.pokemon.selected');
    if (!selectedPokemonImage) {
      console.error('Ningún Pokémon seleccionado.');
      return;
    }

    // Obtener el nombre del Pokémon a partir del atributo 'alt' de la imagen
    const pokemonName = selectedPokemonImage.getAttribute('alt');

    // Guardar el Pokémon seleccionado en localStorage
    localStorage.setItem('pokemonSeleccionado', JSON.stringify({ name: pokemonName }));

    // Redirigir al usuario a la página "battle.html"
    window.location.href = 'battle.html';
});
});

document.querySelector("#show-login").addEventListener("click",function(){
  document.querySelector(".popup").classList.add("active");
});
document.querySelector(".popup .close-btn").addEventListener("click",function(){
  document.querySelector(".popup").classList.remove("active")
});