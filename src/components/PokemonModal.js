import React, { useContext } from 'react';
import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Tabs,
  Tab,
  TabBody,
  Toolbar,
  Hourglass,
} from 'react95';
import Img from 'react-image';
import Stats from './Stats';
import Abilities from './Abilities';
import { StoreContext } from '../store';
import { titleCase, roundOff } from '../utils';

const typeColors = {
  normal: '#8A8A80',
  fire: '#FE6148',
  water: '#4B90D6',
  electric: '#FFCC32',
  grass: '#77CC55',
  ice: '#7ED4FF',
  fighting: '#BA5544',
  poison: '#AA5599',
  ground: '#D8BD6C',
  flying: '#9AA9FE',
  psychic: '#FF6FA9',
  bug: '#AABB22',
  rock: '#C5B67E',
  ghost: '#7D7EC6',
  dragon: '#7766ED',
  dark: '#795848',
  steel: '#B7B7C5',
  fairy: '#F1A9F0',
};

const PokemonModal = () => {
  const [state, dispatch] = useContext(StoreContext);

  const _handleClose = () => {
    dispatch({ type: 'SET_POKEMON_MODAL', payload: false });
    dispatch({ type: 'SET_TAB', payload: 0 });
    dispatch({ type: 'SET_HIDE_POKEMON_MODAL_BUTTON', payload: true });
  };

  const _handleChange = tab => {
    dispatch({ type: 'SET_TAB', payload: tab });
  };

  const _handleClick = () => {
    dispatch({ type: 'SET_ACTIVE_MODAL', payload: 'pokemon' });
  };

  const types = state.selectedPokemon.types.map((i, idx) => {
    return (
      <React.Fragment key={idx}>
        <div
          style={{
            background: typeColors[i.type.name],
            color: '#FFFFFF',
            padding: 5,
            maxWidth: 100,
            display: 'inline-block',
          }}
        >
          {i.type.name}
        </div>{' '}
      </React.Fragment>
    );
  });

  return (
    <Window
      onClick={_handleClick}
      style={{
        width: 600,
        maxWidth: '94%',
        maxHeight: '100%',
        minHeight: 450,
        zIndex: state.activeModal === 'pokemon' ? 2 : 1,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: state.pokemonModal ? 'block' : 'none',
      }}
    >
      <WindowHeader className="window-header flex items-center justify-between">
        <span>Pokemon.exe</span>
        <Button
          style={{ marginRight: '-6px', marginTop: '1px' }}
          size={'sm'}
          square
          onClick={_handleClose}
        >
          <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>
            x
          </span>
        </Button>
      </WindowHeader>
      <Toolbar>
        <Button onClick={_handleClose} disabled={true} variant="menu" size="sm">
          File
        </Button>
        <Button onClick={_handleClose} variant="menu" size="sm">
          Exit
        </Button>
      </Toolbar>
      <WindowContent>
        {state.fetchPokemonLoading && (
          <div
            className="center flex justify-center items-center"
            style={{ height: 250 }}
          >
            <Hourglass size={32} />
          </div>
        )}

        {!state.fetchPokemonLoading && (
          <>
            <Tabs value={state.tab} onChange={_handleChange}>
              <Tab value={0}>Basic Info</Tab>
              <Tab value={1}>Stats</Tab>
              <Tab value={2}>Abilities</Tab>
            </Tabs>
            <TabBody>
              {state.tab === 0 && (
                <div className="sm-flex justify-center items-center">
                  <div className="center">
                    <Img
                      style={{ width: 200 }}
                      src={`${state.spriteEndpoint}/${state.selectedPokemon.id}.png`}
                      loader={
                        <Hourglass size={32} style={{ marginRight: 20 }} />
                      }
                    />{' '}
                  </div>
                  <div>
                    <div className="bold">
                      <span className="xs-hide sm-hide h1">
                        {titleCase(state.selectedPokemon.name)} #
                        {state.selectedPokemon.id}
                      </span>
                      <span className="md-hide lg-hide h1">
                        {titleCase(state.selectedPokemon.name)} #
                        {state.selectedPokemon.id}
                      </span>
                    </div>

                    <div className="mt2">{types}</div>

                    <p className="mt2">
                      <span className="bold">Height:</span>{' '}
                      {roundOff(state.selectedPokemon.height * 0.1)}m{' '}
                      <span className="bold">Weight:</span>{' '}
                      {roundOff(state.selectedPokemon.weight * 0.1)}kg
                    </p>

                    <p className="mt2">{state.selectedPokemon.flavor_text}</p>
                  </div>
                </div>
              )}
              {state.tab === 1 && <Stats stats={state.selectedPokemon.stats} />}
              {state.tab === 2 && (
                <Abilities abilities={state.selectedPokemon.abilities} />
              )}
            </TabBody>
          </>
        )}
      </WindowContent>
    </Window>
  );
};

export default PokemonModal;
