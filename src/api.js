import axios from 'axios';

const getPokemon = async pokemonId => {
  try {
    const data = (await axios(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`))
      .data;
    const species = (
      await axios(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
    ).data;
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
    const res = await axios('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = res.data.results.map((i, idx) => {
      return {
        id: idx + 1,
        name: i.name,
        selected: false,
      };
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export { getPokemon, getAllPokemons };
