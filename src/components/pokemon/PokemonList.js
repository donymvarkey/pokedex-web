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
        this.setState({
            pokemon: res.data['results']
        })
        
    }
    // async getNextUrl() {
    //     let res = await axios.get(this.state.nextUrl);
    //     this.setState({
    //         pokemon: res.data['results'],
    //         url: res.data.next,
    //         prevUrl: res.data.previous
    //     })
    // }
    render() {
        return (
            <React.Fragment>
                {
                    this.state.pokemon ? (
                        <div className="row mt-3">
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
                <div className="row mb-3">
                    <div className="col-md-6 ">
                        {
                            this.state.prevUrl ? (
                                <button className="btn float-right" style={{backgroundColor: "#FFEBEE"}} >Prev</button>
                            ) : (
                                <button className="btn float-right disabled" style={{backgroundColor: "#FFEBEE"}} >Prev</button>
                            )
                        }
                        
                    </div>
                    <div className="col-md-6 ">
                        {
                            this.state.url ? (
                                <button className="btn float-left" style={{backgroundColor: "#FFEBEE"}} onClick={this.getNextUrl} >Next</button>
                            ) : (
                                <button className="btn float-left disabled" style={{backgroundColor: "#FFEBEE"}} >Next</button>
                            )
                        }
                        
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
