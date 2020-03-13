import React, { useContext } from 'react';
import { StoreContext } from '../store';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Pokeball from '../assets/pokeball.png';
import axios from 'axios';

import { titleCase } from '../utils';
const imageUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

const Pokemon = ({ pokemon, setSelected }) => {
  const { id, name, selected } = pokemon;
  const [, dispatch] = useContext(StoreContext);

  const handleDoubleClick = async () => {
    dispatch({ type: 'SET_ACTIVE_MODAL', payload: 'pokemon' });
    dispatch({ type: 'SET_POKEMON_MODAL', payload: true });
    dispatch({ type: 'SET_HIDE_POKEMON_MODAL_BUTTON', payload: false });
    dispatch({ type: 'SET_FETCH_POKEMON_LOADING', payload: true });
    const data = (await axios(`https://pokeapi.co/api/v2/pokemon/${name}`))
      .data;
    const species = (
      await axios(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`)
    ).data;
    const flavorTextEntry = species.flavor_text_entries.findIndex(i => {
      return i.language.name === 'en' && i.version.name === 'y';
    });
    data.flavor_text = species.flavor_text_entries[flavorTextEntry].flavor_text;
    dispatch({ type: 'SET_SELECTED_POKEMON', payload: data });
    dispatch({ type: 'SET_FETCH_POKEMON_LOADING', payload: false });
  };

  return (
    <div
      onClick={() => setSelected(id)}
      onDoubleClick={handleDoubleClick}
      className="pointer flex flex-column justify-center items-center"
    >
      <LazyLoadImage
        placeholderSrc={Pokeball}
        effect="blur"
        alt="pokemon"
        src={`${imageUrl}${id}.png`}
        className="pokemon"
      />
      <span
        className={`text-underline ${selected && 'selected-pokemon'}`}
        style={{
          color: 'white',
          userSelect: 'none',
        }}
      >
        {titleCase(name)}
      </span>
    </div>
  );
};

export default Pokemon;
