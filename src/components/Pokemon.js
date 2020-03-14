import React, { useContext } from 'react';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import { StoreContext } from '../store';
import { getPokemon } from '../api';

import { titleCase } from '../utils';

const Pokemon = ({ pokemon, setSelected }) => {
  const { id, name, selected } = pokemon;
  const [state, dispatch] = useContext(StoreContext);

  const _handleDoubleClick = () => {
    openPokemonModal();
  };

  const _handlekeyDown = e => {
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
      onDoubleClick={_handleDoubleClick}
      onKeyDown={_handlekeyDown}
      className="pointer flex flex-column justify-center items-center"
      style={{ outline: 'none' }}
    >
      <VisibilitySensor>
        <Img
          src={`${state.spriteEndpoint}${id}.png`}
          loader={
            <img
              alt="placeholder"
              style={{ width: 50 }}
              src={require('../assets/pokeball.png')}
            />
          }
        />
      </VisibilitySensor>
      <span
        className="text-underline"
        style={{
          color: '#FFFFFF',
          userSelect: 'none',
          padding: 2,
          background: selected ? '#0000aa' : 'transparent',
          textDecoration: 'underline',
        }}
      >
        {titleCase(name)}
      </span>
    </div>
  );
};

export default Pokemon;
