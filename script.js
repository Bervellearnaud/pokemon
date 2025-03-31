async function getRandomPokemon() {
  const type = document.getElementById("type-select").value;
  let url =
    "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 898 + 1);

  try {
    let response = await fetch(url);
    let data = await response.json();

    let pokemonName = data.name;
    let pokemonImage = data.sprites.front_default;
    let pokemonTypes = data.types.map((t) => t.type.name);

    if (type && !pokemonTypes.includes(type)) {
      return getRandomPokemon(); // Relancer la recherche si le type ne correspond pas
    }

    document.getElementById("pokemon-name").innerText =
      pokemonName.toUpperCase();
    document.getElementById("pokemon-image").src = pokemonImage;
    document.getElementById("pokemon-image").style.display = "block";
    document.getElementById("pokemon-type").innerText =
      "Type(s) : " + pokemonTypes.join(", ");
  } catch (error) {
    console.error("Erreur lors de la récupération du Pokémon", error);
  }
}
