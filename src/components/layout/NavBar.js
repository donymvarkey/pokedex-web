import React, { Component } from 'react';
import pokemonLogo from '../assets/logo.png'

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          
            <a href="#" className="navbar-brand col-sm-3 col-md-2 align-items-center mr-0" >
              <img src={pokemonLogo} style={{width: '3em', height: '1.2em'}} >
            
              </img>
            </a>
        </nav>
      </div>
    );
  }
}
