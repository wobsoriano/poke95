import { useContext } from 'react';
import { StoreContext } from '../store';
import { Button } from 'react95';
import CDImage from '../assets/cd.png';

export const PokemonModalButton = () => {
  const [state, dispatch] = useContext(StoreContext);

  const _handleClick = () => {
    dispatch({ type: 'SET_ACTIVE_MODAL', payload: 'pokemon' });
    dispatch({ type: 'SET_POKEMON_MODAL', payload: !state.pokemonModal });
  };

  return (
    <>
      {!state.hidePokemonModalButton && (
        <Button onClick={_handleClick} active={state.pokemonModal} className="bold">
          <img src={CDImage} alt="cdLogo" style={{ marginLeft: -2, marginRight: 5, width: 20 }} />
          Pokemon
        </Button>
      )}
    </>
  );
};
