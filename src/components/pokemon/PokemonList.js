import React, { Component } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import spinner from '../assets/spinner.gif'

export default class PokemonList extends Component {
    state = {
        url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=30",
        pokemon: null
    }    
    async componentDidMount() {
        let res = await axios.get(this.state.url);
        this.setState({pokemon: res.data['results']})
    }
    render() {
        return (
            <React.Fragment>
                {
                    this.state.pokemon ? (
                        <div className="row">
                            {
                                this.state.pokemon.map(pokemon => (
                                    <PokemonCard 
                                        key = {pokemon.name}
                                        name = {pokemon.name}
                                        url = {pokemon.url}
                                    />
                                ))
                            }
                        </div>
                    ) : (
                        <img src={spinner} style={{width: '10em', height: '10em'}} className="mx-auto rounded mt-5 ml-5" />
                    )
                }
            </React.Fragment>
        );
    }
}
