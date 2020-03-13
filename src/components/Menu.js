import React, { useContext } from 'react';
import { StoreContext } from '../store';
import { Button, List, ListItem, Divider } from 'react95';

const Menu = () => {
  const [state, dispatch] = useContext(StoreContext);

  const handleClick = () => {
    dispatch({ type: 'SET_MENU', payload: !state.menu });
  };

  const handleClose = () => {
    dispatch({ type: 'SET_MENU', payload: false });
  };

  const handleListItemClick = name => {
    if (name === 'about') {
      dispatch({ type: 'SET_ACTIVE_MODAL', payload: 'about' });
      dispatch({ type: 'SET_ABOUT_MODAL', payload: true });
      dispatch({ type: 'SET_HIDE_ABOUT_MODAL_BUTTON', payload: false });
    } else if (name === 'github') {
      const win = window.open('https://github.com/sorxrob/poke95', '_blank');
      win.focus();
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {state.menu && (
        <List
          style={{ zIndex: 2 }}
          horizontalAlign="left"
          verticalAlign="bottom"
          open={state.menu}
          onClick={handleClose}
        >
          <ListItem
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => handleListItemClick('github')}
          >
            <img
              style={{ width: 22, marginRight: 3 }}
              src={require('../assets/cd.png')}
              alt="aboutLogo"
            />
            <span>GitHub</span>
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => handleListItemClick('about')}
          >
            <img
              style={{ width: 22, marginRight: 3 }}
              src={require('../assets/computer.png')}
              alt="aboutLogo"
            />
            <span>About</span>
          </ListItem>
          <Divider />
          <ListItem disabled>Logout</ListItem>
        </List>
      )}
      <Button
        onClick={handleClick}
        active={state.menu}
        style={{ fontWeight: 'bold', marginRight: 6 }}
      >
        {/* <LogoIcon style={{ marginLeft: -2, marginRight: 4 }} /> */}
        <img
          src={require('../windowslogo.png')}
          alt="winlogo"
          style={{ marginLeft: -2, marginRight: 5, width: 20 }}
        />
        Poke95
      </Button>
    </div>
  );
};

export default Menu;
