import React, { Component } from 'react';
import pokedexLogo from '../assets/pokedex.png'

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark  fixed-top" >
          <a href="/" className="navbar-brand col-sm-3 col-md-2 align-items-center mr-0" >
            <img src={pokedexLogo} style={{width: '3em', height: '2.2em'}} /> React Pokedex
          </a>
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search Pokemon" aria-label="Search Pokemon"/>
            <button className="btn btn-light my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
      </div>
    );
  }
}
