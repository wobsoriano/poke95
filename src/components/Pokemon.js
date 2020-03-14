import React, { useContext } from 'react';
import { StoreContext } from '../store';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getPokemon } from '../api';

import { titleCase } from '../utils';

const Pokemon = ({ pokemon, setSelected }) => {
  const { id, name, selected } = pokemon;
  const [state, dispatch] = useContext(StoreContext);

  const handleDoubleClick = () => {
    openPokemonModal();
  };

  const handlekeyDown = e => {
    if (e.key === 'Enter') {
      openPokemonModal();
    }
  };

  const openPokemonModal = async () => {
    dispatch({ type: 'SET_ACTIVE_MODAL', payload: 'pokemon' });
    dispatch({ type: 'SET_POKEMON_MODAL', payload: true });
    dispatch({ type: 'SET_HIDE_POKEMON_MODAL_BUTTON', payload: false });
    dispatch({ type: 'SET_FETCH_POKEMON_LOADING', payload: true });
    const data = await getPokemon(id);
    dispatch({ type: 'SET_SELECTED_POKEMON', payload: data });
    dispatch({ type: 'SET_FETCH_POKEMON_LOADING', payload: false });
  };

  return (
    <div
      tabIndex="0"
      onClick={() => setSelected(id)}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handlekeyDown}
      className="pointer flex flex-column justify-center items-center"
      style={{ outline: 'none' }}
    >
      <LazyLoadImage
        placeholderSrc={require('../assets/pokeball.png')}
        effect="opacity"
        alt="pokemon"
        src={`${state.spriteEndpoint}${id}.png`}
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
