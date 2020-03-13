import React, { createContext, useReducer } from 'react';

export const StoreContext = createContext({});

const initialState = {
  menu: false,
  pokemonModal: false,
  aboutModal: false,
  activeModal: '',
  hidePokemonModalButton: true,
  hideAboutModalButton: true,
  tab: 0,
  fetchPokemonLoading: false,
  selectedPokemon: {
    name: null,
    stats: [],
    types: [],
    abilities: [],
  },
  spriteEndpoint:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_MENU':
      return {
        ...state,
        menu: action.payload,
      };
    case 'SET_POKEMON_MODAL':
      return {
        ...state,
        pokemonModal: action.payload,
      };
    case 'SET_ABOUT_MODAL':
      return {
        ...state,
        aboutModal: action.payload,
      };
    case 'SET_TAB':
      return {
        ...state,
        tab: action.payload,
      };
    case 'SET_FETCH_POKEMON_LOADING':
      return {
        ...state,
        fetchPokemonLoading: action.payload,
      };
    case 'SET_ACTIVE_MODAL':
      return {
        ...state,
        activeModal: action.payload,
      };
    case 'SET_SELECTED_POKEMON':
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    case 'SET_HIDE_POKEMON_MODAL_BUTTON':
      return {
        ...state,
        hidePokemonModalButton: action.payload,
      };
    case 'SET_HIDE_ABOUT_MODAL_BUTTON':
      return {
        ...state,
        hideAboutModalButton: action.payload,
      };
    default:
      return state;
  }
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
