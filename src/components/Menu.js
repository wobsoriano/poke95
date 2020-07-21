import React, { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../store';
import { Button, List, ListItem, Divider } from 'react95';
import ClickAwayListener from 'react-click-away-listener';

const Menu = () => {
  const [state, dispatch] = useContext(StoreContext);
  const [startupSound, setStartupSound] = useState(null);

  useEffect(() => {
    const ss = localStorage.getItem('startup_sound');
    if (ss === null) {
      localStorage.setItem('startup_sound', true);
      setStartupSound(true);
    } else {
      setStartupSound(ss === 'true');
    }
  }, []);

  const _handleClick = () => {
    dispatch({ type: 'SET_MENU', payload: !state.menu });
  };

  const _handleClose = () => {
    dispatch({ type: 'SET_MENU', payload: false });
  };

  const _handleStartupSound = () => {
    const ss = localStorage.getItem('startup_sound');
    if (ss === 'true') {
      localStorage.setItem('startup_sound', false);
      setStartupSound(false);
    } else {
      localStorage.setItem('startup_sound', true);
      setStartupSound(true);
    }
  };

  const _handleListItemClick = name => {
    if (name === 'about') {
      dispatch({ type: 'SET_ACTIVE_MODAL', payload: 'about' });
      dispatch({ type: 'SET_ABOUT_MODAL', payload: true });
      dispatch({ type: 'SET_HIDE_ABOUT_MODAL_BUTTON', payload: false });
    } else if (name === 'github') {
      const win = window.open('https://github.com/sorxrob/poke95', '_blank');
      win.focus();
    }
  };

  const _handleClickAway = () => {
    if (state.menu) {
      dispatch({ type: 'SET_MENU', payload: false });
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <ClickAwayListener onClickAway={_handleClickAway}>
        {state.menu && (
          <List
            style={{ position: 'absolute', left: '0', top: '100%' }}
            onClick={_handleClose}
          >
            <ListItem onClick={() => _handleListItemClick('github')}>
              <img
                style={{ width: 22, marginRight: 8 }}
                src={require('../assets/cd.png')}
                alt="aboutLogo"
              />
              <span>GitHub Repo</span>
            </ListItem>
            <ListItem onClick={() => _handleListItemClick('about')}>
              <img
                style={{ width: 22, marginRight: 8 }}
                src={require('../assets/computer.png')}
                alt="aboutLogo"
              />
              <span>About</span>
            </ListItem>
            <Divider />
            <ListItem onClick={_handleStartupSound}>
              Startup Sound: {startupSound ? 'On' : 'Off'}
            </ListItem>
          </List>
        )}
        <Button
          onClick={_handleClick}
          active={state.menu}
          style={{ fontWeight: 'bold', marginRight: 6 }}
        >
          <img
            src={require('../assets/windowslogo.png')}
            alt="winlogo"
            style={{ marginLeft: -2, marginRight: 5, width: 20 }}
          />
          Poké95
        </Button>
      </ClickAwayListener>
    </div>
  );
};

export default Menu;
