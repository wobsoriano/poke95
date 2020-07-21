import React, { useState, useEffect } from 'react';
import './App.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import FilterResults from 'react-filter-search';
import { styleReset, AppBar, Toolbar, TextField, Hourglass } from 'react95';

import original from 'react95/dist/themes/original';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

import Store from './store';
import { getAllPokemons } from './api';
import { startupSound } from './utils';

// Components
import PokemonModal from './components/PokemonModal';
import AboutModal from './components/AboutModal';
import Menu from './components/Menu';
import Pokemon from './components/Pokemon';
import AboutModalButton from './components/AboutModalButton';
import PokemonModalButton from './components/PokemonModalButton';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
  ${styleReset}
`;

const sound = startupSound();

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Play startup sound
    const ss = localStorage.getItem('startup_sound');
    if (ss === 'true' || ss === null) {
      sound.play();
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllPokemons();
        setPokemons(data);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: '90vh' }}
      >
        <Hourglass size={40} />
      </div>
    );
  }

  if (error) {
    return <p style={{ color: 'white' }}>An error occurred. Please refresh.</p>;
  }

  const setSelected = id => {
    const data = pokemons.map(i => {
      return {
        ...i,
        selected: false,
      };
    });
    const idx = data.findIndex(i => i.id === +id);
    data[idx].selected = true;
    setPokemons(data);
  };

  return (
    <Store>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <nav>
          <AppBar style={{ zIndex: 3 }}>
            <Toolbar style={{ justifyContent: 'space-between' }}>
              <Menu />
              <AboutModalButton />
              <PokemonModalButton />
              <TextField
                placeholder="Search..."
                width={150}
                style={{ marginLeft: 'auto' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </Toolbar>
          </AppBar>
        </nav>
        <main>
          <div className="container pt4">
            <PokemonModal />
            <AboutModal />
            <div className="clearfix mxn1">
              <FilterResults
                value={search}
                data={pokemons}
                renderResults={results => (
                  <>
                    {results.map(i => (
                      <div
                        key={i.id}
                        className="col col-6 sm-col-3 md-col-2 px1 mb2"
                      >
                        <Pokemon pokemon={i} setSelected={setSelected} />
                      </div>
                    ))}
                  </>
                )}
              />
            </div>
          </div>
        </main>
      </ThemeProvider>
    </Store>
  );
}

export default App;
