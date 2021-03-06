import React, { Component } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import spinner from '../assets/spinner.gif'
import SearchBar from '../layout/SearchBar'

export default class PokemonList extends Component {
    state = {
        url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
        pokemon: null,
        inputQuery: "",
        prevUrl: null,
        nextUrl: null
    }    
    async componentDidMount() {
        let res = await axios.get(this.state.url);
        this.setState({
            pokemon: res.data['results'],
            prevUrl: res.data.previous,
            nextUrl: res.data.next
        })  
    }

    getQuery = (query) => {
        let formattedQuery = query.toLowerCase()
        this.setState({
            inputQuery: formattedQuery
        })
    }

    getPokemon = (event) => {
        event.preventDefault()
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.inputQuery}`)
        .then((res) => {
            // console.log(res.data)
            let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${res.data.id}/`
            let results = [];
            results.push({
                name: res.data.name,
                url: pokemonUrl
            })

            this.setState({
                pokemon: results
            })
        })
    }

    loadPrevPokemonPage = () => {
        axios.get(this.state.prevUrl)
        .then(res => {
            // console.log(res.data['results'])
            this.setState({
                pokemon: res.data['results'],
                prevUrl: res.data.previous,
                nextUrl: res.data.next
            })  
        })
    }

    loadNextPokemonPage = () => {
        axios.get(this.state.nextUrl)
        .then(res => {
            // console.log(res.data['results'])
            this.setState({
                pokemon: res.data['results'],
                prevUrl: res.data.previous,
                nextUrl: res.data.next
            })  
        })
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                        <SearchBar getQueryFromInput={this.getQuery} searchPokemon={this.getPokemon} />
                    </div>
                </div>
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
                        <img alt="spinner" src={spinner} style={{width: '10em', height: '10em'}} className="mx-auto rounded mt-5 ml-5" />
                    )
                }
                <div className="row mb-3">
                    <div className="col-md-6 text-center">
                        {
                            (this.state.prevUrl) ?    
                                <button className="btn btn-light" type="submit" style={{width: '100px'}} onClick={this.loadPrevPokemonPage}>Prev</button>
                            : 
                                <button className="btn btn-light disabled" type="submit" style={{width: '100px'}}>Prev</button>   
                        }
                    </div>
                    <div className="col-md-6 text-center">
                        {
                            (this.state.nextUrl) ?    
                                <button className="btn btn-light" type="submit" style={{width: '100px'}} onClick={this.loadNextPokemonPage}>Next</button>
                            : 
                                <button className="btn btn-light disabled" type="submit" style={{width: '100px'}}>Next</button>   
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
