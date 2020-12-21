import React, { Component } from 'react';
import pokedexLogo from '../assets/pokedex.png'

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top" >
          <a href="/" className="navbar-brand col-sm-3 col-md-2 mr-0" >
            <img src={pokedexLogo} style={{width: '2em', height: '1.4em'}} alt="Logo" /> React Pokedex
          </a>
        </nav>
      </div>
    );
  }
}
