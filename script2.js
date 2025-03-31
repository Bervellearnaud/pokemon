async function getRandomPokemon() {
  const type = document.getElementById("type-select").value;
  let url =
    "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 898 + 1);

  const pokemonNameElement = document.getElementById("pokemon-name");
  const pokemonImageElement = document.getElementById("pokemon-image");
  const pokemonTypeElement = document.getElementById("pokemon-type");

  // Affichage du chargement
  pokemonNameElement.innerText = "Chargement...";
  pokemonImageElement.style.display = "none";
  pokemonTypeElement.innerText = "";

  try {
    let response = await fetch(url);
    let data = await response.json();

    let pokemonName = data.name;
    let pokemonImage = data.sprites.front_default;
    let pokemonTypes = data.types.map((t) => t.type.name);

    if (type && !pokemonTypes.includes(type)) {
      return getRandomPokemon(); // Relancer la recherche si le type ne correspond pas
    }

    pokemonNameElement.innerText = pokemonName.toUpperCase();
    pokemonImageElement.src = pokemonImage;
    pokemonImageElement.style.display = "block";
    pokemonTypeElement.innerText = "Type(s) : " + pokemonTypes.join(", ");
  } catch (error) {
    console.error("Erreur lors de la récupération du Pokémon", error);
    pokemonNameElement.innerText = "Erreur lors du chargement";
  }
}
