import { $fetch } from 'ohmyfetch';

const getPokemon = async pokemonId => {
  try {
    const [data, species] = await Promise.all([
      $fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
      $fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`),
    ]);

    const flavorTextEntry = species.flavor_text_entries.findIndex(i => {
      return i.language.name === 'en' && i.version.name === 'y';
    });
    data.flavor_text = species.flavor_text_entries[flavorTextEntry].flavor_text;

    return data;
  } catch (e) {
    throw e;
  }
};

const getAllPokemons = async () => {
  try {
    const data = await $fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    return data.results.map((i, idx) => {
      return {
        id: idx + 1,
        name: i.name,
        selected: false,
      };
    });
  } catch (e) {
    throw e;
  }
};

export { getPokemon, getAllPokemons };
