import { $fetch } from 'ofetch';

const getPokemon = async pokemonId => {
  const [data, species] = await Promise.all([
    $fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
    $fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`),
  ]);

  const flavorTextEntry = species.flavor_text_entries.findIndex(i => {
    return i.language.name === 'en' && i.version.name === 'y';
  });
  data.flavor_text = species.flavor_text_entries[flavorTextEntry].flavor_text;

  return data;
};

const getAllPokemons = async () => {
  const data = await $fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  return data.results.map((i, idx) => {
    return {
      id: idx + 1,
      name: i.name,
      selected: false,
    };
  });
};

export { getPokemon, getAllPokemons };
